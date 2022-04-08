import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Constants } from './constant';

@Injectable()
export class AppService {
  constructor(
    @Inject(Constants.LOGGER_SERVICE_NAME) private client: ClientProxy,
  ) {}

  searchText(search: string): Observable<any> {
    return this.client.send('search', search);
  }

  sync(): Observable<any> {
    return this.client.emit('sync', true);
  }
}
