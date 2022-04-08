import { DropboxServiceProviderToken } from '../constant';
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';

export default {
  provide: DropboxServiceProviderToken,
  useFactory() {
    const { DROPBOX_ACCESS_TOKEN } = process.env;
    return new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch });
  },
};
