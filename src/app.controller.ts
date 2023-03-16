import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Dto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAtis(@Query() data: Dto) {
    return this.appService.getAtis(data);
  }
}
