import { Injectable, Logger } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import * as mammoth from 'mammoth';

@Injectable()
export class ExtractorService {
  private logger = new Logger('ExtractorService');

  /**
   * Extract the data from the file type pdf
   * @param {string} filePath
   * @returns {Promise<string>}
   * @memberof ExtractorService
   * @example
   * const data = await this.extractorService.extractData('file.pdf');
   * console.log(data);
   * // {
   * //   text: 'text',
   * //   html: 'html',
   * //   path: 'path',
   * //   type: 'type',
   * //   size: 123,
   * //   pageCount: 123,
   * //   pageSize: {
   * //     width: 123,
   * //     height: 123,
   * //   },
   * // }
   */

  async getTextFromPDF(buffer: Buffer) {
    this.logger.debug('converting pdf into text');
    return await pdf(buffer);
  }

  /**
   * Extract the data from the file type docx
   * @param {string} filePath
   * @returns {Promise<string>}
   * @memberof ExtractorService
   * @example
   * const data = await this.extractorService.extractData('file.docx');
   * console.log(data);
   *
   */

  async getTextFromDOCX(buffer: Buffer) {
    this.logger.debug('converting docx into text');
    const response = await mammoth.extractRawText({ buffer });
    return response.value;
  }
}
