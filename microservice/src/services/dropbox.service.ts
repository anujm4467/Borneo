import { Inject, Injectable, Logger } from '@nestjs/common';
import { DropboxServiceProviderToken } from '../constant';
import { Dropbox, DropboxResponse, files } from 'dropbox';

@Injectable()
export class DropboxService {
  private logger = new Logger('DropboxService');

  constructor(
    @Inject(DropboxServiceProviderToken)
    private readonly dropbox: Dropbox,
  ) {}

  async getFile(): Promise<files.ListFolderResult> {
    this.logger.debug('getting the file from dropbox');

    const files: DropboxResponse<files.ListFolderResult> =
      await this.dropbox.filesListFolder({ path: '', limit: 20 });

    return files.result;
  }

  async downloadFiles(files: files.ListFolderResult) {
    this.logger.debug('downloading files from dropbox');
    const filesList = [];
    for (const item of files.entries) {
      if (
        item['.tag'] == 'file' &&
        (item.path_lower.includes('.pdf') || item.path_lower.includes('.docx'))
      ) {
        const fileData = await this.dropbox.filesDownload({
          path: item.path_lower,
        });
        filesList.push(fileData.result);
      }
    }
    return filesList;
  }
}
