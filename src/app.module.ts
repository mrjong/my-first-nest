import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
