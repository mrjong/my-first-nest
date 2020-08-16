import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult, Connection } from 'typeorm'
import { User } from './entity/users.entity'
import { CreateUserDto } from './dto/users.create.dto'
import { makeSalt, encryptPassword } from '../../utils/cryptogram'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection
  ) { }

  async getUserInfo(username: string, password?: string) {
    //查询条件
    const where = {
      username
    }

    if (password) {
      Object.assign(where, {
        password
      })
    }
    //查询
    const result = await this.usersRepository.findOne({ where })

    return result
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, password, nickname, city, gender } = createUserDto
    const user = await this.getUserInfo(username)
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt) // 加密密码

    try {
      //存入数据库
      return this.usersRepository.save({
        username,
        password: hashPwd,
        nickname,
        // city,
        // gender
      })
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async createMany(users: User[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      //你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }

}
