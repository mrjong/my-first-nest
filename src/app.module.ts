import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";

@Module({
  imports: [AuthModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [],
    //   synchronize: true,
    // })
  ],
  controllers: [AppController]
})
export class AppModule {
  // constructor(private readonly connection: Connection) {

  // }
}
