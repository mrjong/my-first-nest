import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult, Connection } from 'typeorm'
import { Blog } from './entity/blogs.entity'

@Injectable()
export class BlogsService {


}
