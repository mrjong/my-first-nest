import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get('/haha')
  findAll(@Req() request: Request): string {
    return 'hhhhhh111';
  }
}
