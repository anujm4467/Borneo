import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DropboxService } from './services/dropbox.service';
import { ExtractorService } from './services/extractor.service';
import { SearchService } from './services/search.service';
import { DropboxFileType } from './types/search.types';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(
    private readonly dropboxService: DropboxService,
    private readonly extractorService: ExtractorService,
    private readonly searchService: SearchService,
  ) {}

  @EventPattern('sync')
  async search(@Payload() search: string) {
    // get all the existing files from elasticsearch

    const document = await this.searchService.getAllDocument();

    this.logger.debug(`received search: ${search}`);

    // get the list of files from dropbox

    const files = await this.dropboxService.getFile();

    // download the files from dropbox using file id and name

    const filesList = await this.dropboxService.downloadFiles(files);

    this.logger.debug(`files downloaded: ${filesList.length}`);

    // loop through the files and extract the data

    const promise = [];

    for (const item of filesList) {
      this.logger.debug(`file: ${item.name} start extracting`);

      // check if the file is a pdf or docx file is already indexed in elasticsearch

      const isExist = document.hits.hits.filter(
        (element) => element._source.fileID === item.id,
      );

      // if the file is not indexed in elasticsearch, then extract the data
      if (isExist.length === 0) {
        // create public url for the file using file path_lower

        const fileURL = await this.dropboxService.getPublicUrl(item.path_lower);

        this.logger.debug(`file url: ${fileURL}`);

        // create default file type object to add in elasticsearch

        const dropboxFileType: DropboxFileType = {
          fileID: item.id,
          name: item.name,
          pathLower: item.path_lower,
          fileType: item.name.split('.').pop(),
          publicURL: fileURL,
        };

        // get the extracted data from the file using extractor service

        if (item.path_lower.includes('.pdf')) {
          const text = await this.extractorService.getTextFromPDF(
            item.fileBinary,
          );
          dropboxFileType.fileText = text.text;
        }

        if (item.path_lower.includes('.docx')) {
          const text = await this.extractorService.getTextFromDOCX(
            item.fileBinary,
          );
          dropboxFileType.fileText = text;
        }

        this.logger.debug(
          `dropbox file type: ${JSON.stringify(dropboxFileType)}`,
        );

        // add the extracted data to elasticsearch using search service

        promise.push(this.searchService.indexPost(dropboxFileType));
      } else {
        // if the file is already indexed in elasticsearch, then skip the file
        this.logger.debug(`file: ${item.name} already indexed`);
      }
    }
    await Promise.all(promise);
  }

  @EventPattern('search')
  async delete(@Payload() search: string) {
    // get all the files using search from elasticsearch

    this.logger.debug(`received search: ${search}`);

    const searchData = await this.searchService.search(search);

    this.logger.debug(`search data: ${JSON.stringify(searchData.hits.hits)}`);

    return searchData.hits.hits;
  }
}
