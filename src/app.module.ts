import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [CatsModule, AuthModule, UsersModule],
})
export class AppModule {}
