import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('REFRESH_CONFIG', (): JwtModuleOptions => {
  return {
    secret: process.env.REFRESH_SECRET || 'Hello1254',
    signOptions: {
      expiresIn: process.env.REFRESH_EXPIRES || '7d',
    },
  };
});
