import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.role)
  }

  matchRoles(roles: string[], role: string): boolean {
    if (roles.includes(role)) {
      return true
    } else {
      //无权限访问接口
      throw new UnauthorizedException()
    }
  }
}
