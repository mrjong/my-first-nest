import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Logger } from "../../utils/log4js";

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;
    // console.log(method, url)
    return next.handle().pipe(map(data => {
      // const response = context.switchToHttp().getResponse()
      // console.log(response.statusCode)
      const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    User: ${JSON.stringify(request.user)}
    Response data:\n ${JSON.stringify(data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
      Logger.info(logFormat);
      Logger.access(logFormat);
      return {
        data,
        code: 0,
        message: '请求成功'
      }
      // return data
    }),
      // catchError((error) => {
      //   const response = context.switchToHttp().getResponse();
      //   const delay = Date.now() - now;
      //   console.error(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
      //   return throwError(error);
      // }),
    )
  }
}
