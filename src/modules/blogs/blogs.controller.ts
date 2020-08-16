import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@Controller('blog')
export class BlogsController {
  @Post('create')
  createBlog() {
    return '123'
  }

  @Post('loadMore/:pageIndex')
  loadMore() {
    return '123'

  }
}
