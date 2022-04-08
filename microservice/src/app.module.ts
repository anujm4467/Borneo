import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { DropboxService } from './services/dropbox.service';
import { ExtractorService } from './services/extractor.service';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import DropboxProvider from './provider/dropbox.provider';
import { SearchService } from './services/search.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.register({
      node: process.env.ELASTIC_NODE,
      maxRetries: 10,
      requestTimeout: 60000,
    }),
  ],
  controllers: [AppController],
  providers: [DropboxService, ExtractorService, SearchService, DropboxProvider],
})
export class AppModule implements OnModuleInit {
  private logger = new Logger('AppModule');

  constructor(private readonly searchService: SearchService) {}

  public async onModuleInit() {
    this.logger.log('creating the elasticsearch index');
    const response = await this.searchService.createIndex();
    this.logger.log(`response from index creating `, response);
  }
}
