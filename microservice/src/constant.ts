import { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';

export const DropboxServiceProviderToken = 'GoogleServiceProviderToken';
export const ElasticsearchIndexMapping: MappingTypeMapping = {
  properties: {
    fileType: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    fileText: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
        },
      },
    },
    name: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    pathLower: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    fileID: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    publicURL: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
  },
};
