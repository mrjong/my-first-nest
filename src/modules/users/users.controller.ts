import { Controller, Request, Post, Get, UseGuards, Body, UseInterceptors, UseFilters, HttpException, HttpStatus, ConflictException, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/users.create.dto'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { ValidationPipe } from '../../common/pipes/validate.pipe'

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {

  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    //创建用户
    return this.usersService.register(createUserDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('isExist')
  async isExist(@Body() createUserDto: CreateUserDto): Promise<any> {

    const userInfo = await this.usersService.getUserInfo(createUserDto.username)
    if (userInfo) {
      return {
        username: 'chenjiong',
        city: '北京'
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
      // throw new Error('123')
    }
  }

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: CreateUserDto): Promise<any> {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @Post('logout')
  logout() {
    return 123
  }

  @Post('changeInfo')
  changeInfo() {
    return 123
  }

  @Post('changePassword')
  changePassword() {
    return 123
  }
}
