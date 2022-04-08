import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *    "data": "Hello World"
 *  }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *  {
 *   "error": "Not Found"
 * }
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 * {
 *  "error": "Internal Server Error"
 * }
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Content-Type": "application/json"
 * }
 * @apiParamExample {json} Request-Example:
 * {
 * "search": "Hello"
 * }
 *
 */

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @api {get} /api/searchText?search=search Hello
   * @apiGroup API
   * @apiParam {String} search Search text
   */

  @Get('searchText')
  @ApiQuery({
    name: 'search',
    description: 'input the search data',
    required: true,
    example: 'a simple PDF file',
  })
  searchText(@Query('search') search: string, @Res() res) {
    this.appService.searchText(search).subscribe((data) => {
      return res.status(200).json(data);
    });
  }

  /**
   * @description: sync data from dropbox to elasticsearch
   * @return: Observable<string>
   * @memberof AppController
   */

  @Get('sync')
  sync() {
    this.appService.sync().subscribe((data) => {
      console.log(data);
      return data;
    });
  }
}
