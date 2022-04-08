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

  /**
   * Get the list of files from dropbox
   * @returns {Promise<DropboxResponse<files.ListFolderResult>>}
   * @memberof DropboxService
   * @example
   * const files = await this.dropboxService.getFile();
   * console.log(files);
   * // {
   * //   entries: [
   * //     {
   * //       name: 'file.txt',
   * //       path_lower: '/file.txt',
   * //       id: 'id',
   * //       client_modified: '2020-05-06T09:37:00Z',
   * //       server_modified: '2020-05-06T09:37:00Z',
   * //       rev: 'rev',
   * //       size: 123,
   * //   is_downloadable: true, }
   *  ],
   * }
   */

  async getFile(): Promise<files.ListFolderResult> {
    this.logger.debug('getting the file from dropbox');

    const files: DropboxResponse<files.ListFolderResult> =
      await this.dropbox.filesListFolder({ path: '', limit: 20 });

    return files.result;
  }

  /**
   * Download the files from dropbox using file id and name
   * @param {files.ListFolderResult} files
   * @returns {Promise<files.ListFolderResult>}
   * @memberof DropboxService
   * @example
   * const files = await this.dropboxService.downloadFiles(files);
   * console.log(files);
   */

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

  /**
   * Get the public url for the file using file path_lower
   * @param {string} path
   * @returns {Promise<string>}
   * @memberof DropboxService
   * @example
   * const url = await this.dropboxService.getPublicUrl('/file.txt');
   * console.log(url);
   * // https://www.dropbox.com/s/file.txt?dl=0
   */

  async getPublicUrl(path: string): Promise<string> {
    this.logger.debug(`getting public url from dropbox for path: ${path}`);
    const response = await this.dropbox.sharingCreateSharedLinkWithSettings({
      path,
      settings: {
        requested_visibility: { '.tag': 'public' },
      },
    });
    return response.result.url;
  }
}
