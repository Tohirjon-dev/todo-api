import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Res,
  UseGuards,
  Put,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPayload } from 'src/common/interfaces/user-express.interface';
import { UpdateMeDto } from './dto/update-me.dto';
import { TokenService } from '../jwt/token/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private tokenService: TokenService,
  ) {}
  @Post('register')
  async register(@Body() body: CreateAuthDto) {
    try {
      const data = await this.authService.register(body);
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const data = await this.authService.login(body);
      res.cookie('access_token', data.accessToken, {
        httpOnly: true,
      });
      res.cookie('refresh_token', data.refreshToken, {
        httpOnly: true,
      });
      return data.message;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: userPayload) {
    try {
      return await this.authService.getMe(user);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @UseGuards(AuthGuard)
  @Put('me')
  async updateMe(@Body() body: UpdateMeDto, @CurrentUser() user: userPayload) {
    try {
      return await this.authService.updateMe(user, body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @UseGuards(AuthGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }

    try {
      const user = await this.tokenService.verifyRefreshToken(refreshToken);
      const { id, email, role } = user;
      const newAccessToken = await this.tokenService.generateAccessToken({
        id,
        email,
        role,
      });

      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });

      return {
        message: 'Yangi access_token berildi',
      };
    } catch (err) {
      throw new UnauthorizedException(
        'Refresh token muddati tugagan qayta login qiling',
      );
    }
  }
  @UseGuards(AuthGuard)
  @Get('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return { message: 'Tizimdan chiqdingiz' };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
