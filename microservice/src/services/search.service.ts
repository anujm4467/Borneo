import {
  IndexResponse,
  SearchResponse,
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchIndexMapping } from 'src/constant';

@Injectable()
export class SearchService {
  private readonly ElasticIndex: string;

  constructor(private readonly elasticSearchService: ElasticsearchService) {
    this.ElasticIndex = process.env.ELASTIC_INDEX;
  }

  /**
   * Create index in elasticsearch
   * @returns {Promise<any>}
   * @memberof SearchService
   * @example
   * const index = await this.searchService.createIndex();
   * console.log(index);
   * // {
   * //   'acknowledged': true,
   * //   'shards_acknowledged': true,
   * //   'index': 'index',
   * //   'status': 200,
   * //   '_shards': {
   * //     'total': 5,
   * //     'successful': 5,
   * //     'failed': 0,
   * //   },
   * // }
   */

  async createIndex(): Promise<any> {
    const checkIndex = await this.elasticSearchService.indices.exists({
      index: this.ElasticIndex,
    });

    if (!checkIndex) {
      const response = await this.elasticSearchService.indices.create({
        index: this.ElasticIndex,
        mappings: ElasticsearchIndexMapping,
      });
      return response;
    }
    return `index already exist`;
  }

  /**
   * Post index in elasticsearch
   * @param {any} body
   * @returns {Promise<IndexResponse>}
   * @memberof SearchService
   * @example
   * const index = await this.searchService.postIndex({ body });
   * console.log(index);
   * // {
   * //   '_shards': {
   * //     'total': 5,
   * //     'successful': 5,
   * //     'failed': 0,
   * //   },
   * //   'index': 'index',
   * //   'status': 200,
   * //   '_id': '_id',
   * //   'result': 'created',
   * //   '_seq_no': 0,
   * //   '_primary_term': 1,
   * // }
   */

  async indexPost(body: any): Promise<IndexResponse> {
    const response = await this.elasticSearchService.index({
      index: this.ElasticIndex,
      body,
    });
    return response;
  }

  /**
   * get all document of index in elasticsearch
   * @returns {Promise<any>}
   * @memberof SearchService
   * @example
   * const index = await this.searchService.getAllDocument();
   * console.log(index);
   *
   */

  async getAllDocument(): Promise<any> {
    const response = await this.elasticSearchService.search({
      index: this.ElasticIndex,
    });
    return response;
  }

  /**
   * get document by text search of field {fileText} in elasticsearch
   * @param {string} search
   * @returns {Promise<SearchResponse>}
   * @memberof SearchService
   * @example
   * const index = await this.searchService.getDocumentByTextSearch('fileText');
   * console.log(index);
   *
   */

  async search(search: string): Promise<SearchResponse> {
    const response = await this.elasticSearchService.search({
      index: this.ElasticIndex,
      body: {
        query: {
          match: {
            fileText: {
              query: search,
              operator: 'AND',
            },
          },
        },
      },
    });
    return response;
  }
}
