import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from "./app.controller";
import { UsersController } from './modules/users/users.controller'
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { User } from './modules/users/entity/users.entity'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cj314159',
      database: 'my_nest_db',
      entities: [User],
      synchronize: true,
      // autoLoadEntities: true //开启自动注入实体
    })
  ],
  controllers: [AppController, UsersController]
})
export class AppModule {
  constructor(private readonly connection: Connection) {

  }
}
