import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DropboxService } from './services/dropbox.service';
import { TikaService } from './services/tika.service';

import { ConfigModule } from '@nestjs/config';
import dropboxProvider from './provider/dropbox.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, DropboxService, TikaService, dropboxProvider],
})
export class AppModule {}
