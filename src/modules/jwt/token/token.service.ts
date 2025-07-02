import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @Inject('ACCESS_JWT') private readonly accessJwt: JwtService,
    @Inject('REFRESH_JWT') private readonly refreshJwt: JwtService,
  ) {}

  async generateAccessToken(payload: any): Promise<string> {
    return this.accessJwt.signAsync(payload);
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.refreshJwt.signAsync(payload);
  }

  async verifyAccessToken(token: string): Promise<any> {
    return this.accessJwt.verifyAsync(token);
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return this.refreshJwt.verifyAsync(token);
  }
}
