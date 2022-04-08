import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DropboxService } from './services/dropbox.service';
import { TikaService } from './services/tika.service';

@Controller()
export class AppController {
  constructor(
    private readonly dropboxService: DropboxService,
    private readonly tikaService: TikaService,
  ) {}

  @EventPattern('log')
  async search(@Payload() search: string) {
    const files = await this.dropboxService.getFile();
    const filesList = await this.dropboxService.downloadFiles(files);
    this.tikaService.getTextFromPDF();
    Logger.log(filesList, search);
  }
}
