import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  UseInterceptors,
  UseFilters,
  HttpException,
  HttpStatus,
  ConflictException,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/users.create.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { ValidationPipe } from '../../common/pipes/validate.pipe';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {

  }

  /**
   * 用户注册
   * @param createUserDto
   */
  @UseGuards(AuthGuard('jwt'))  // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    //创建用户
    return await this.usersService.register(createUserDto);
  }

  /**
   * 用户名是否存在
   * @param createUserDto
   */
  @UsePipes(new ValidationPipe())
  @Post('isExist')
  async isExist(@Body() createUserDto: CreateUserDto): Promise<any> {
    const userInfo = await this.usersService.getUserInfo(createUserDto.username);
    if (userInfo) {
      return {
        username: 'chenjiong',
        city: '北京',
      };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      // throw new Error('123')
    }
  }

  /**
   * 用户登录
   * JWT验证 - Step 1: 用户请求登录
   * @param loginParmas
   */
  @Roles('admin') //权限装饰器
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
    return 123;
  }

  @Post('changeInfo')
  changeInfo() {
    return 123;
  }

  @Post('changePassword')
  changePassword() {
    return 123;
  }
}
