import { Injectable, Logger } from '@nestjs/common';
import * as pdf2base64 from 'pdf-to-base64';

@Injectable()
export class TikaService {
  private logger = new Logger('TikaService');

  getTextFromPDF() {
    pdf2base64('http://www.africau.edu/images/default/sample.pdf')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error); //Exepection error....
      });
  }
}
