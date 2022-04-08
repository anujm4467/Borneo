import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({
    name: 'search',
    description: 'input the search data',
    required: true,
    example: 'consume',
  })
  getHello(@Query('search') search: string) {
    this.appService.getHello(search).subscribe((data) => {
      console.log(data);
      return data;
    });
  }
}
