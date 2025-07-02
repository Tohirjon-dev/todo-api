import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from 'src/modules/jwt/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    try {
      const user = await this.tokenService.verifyAccessToken(accessToken);
      req.user = user;
      return true;
    } catch (err) {
      if (refreshToken) {
        try {
          const user = await this.tokenService.verifyRefreshToken(refreshToken);
          const { id, email, role } = user;
          const newAccess = await this.tokenService.generateAccessToken({
            id,
            email,
            role,
          });

          res.cookie('access_token', newAccess, {
            httpOnly: true,
          });
          req.user = user;
          return true;
        } catch (err) {
          console.log(err);
          throw new UnauthorizedException(
            'Refresh token ham yaroqsiz,qaytadan logindan oting',
          );
        }
      }

      throw new UnauthorizedException(
        'Bu amalni bajarishdan oldin logindan oting',
      );
    }
  }
}
