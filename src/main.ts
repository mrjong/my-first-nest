import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 监听所有的请求路由，并打印日志
  app.use(new LoggerMiddleware().use);
  //全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
