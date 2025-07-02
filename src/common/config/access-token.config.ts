import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('ACCESS_CONFIG', (): JwtModuleOptions => {
  return {
    secret: process.env.ACCESS_SECRET || 'Hello123',
    signOptions: {
      expiresIn: process.env.ACCESS_EXPIRES || '15m',
    },
  };
});
