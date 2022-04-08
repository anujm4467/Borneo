import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Constants } from './constant';

@Injectable()
export class AppService {
  constructor(
    @Inject(Constants.LOGGER_SERVICE_NAME) private client: ClientProxy,
  ) {}

  getHello(search: string): Observable<string> {
    return this.client.emit('log', search);
  }
}
