import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JwtModule,
  JwtModuleAsyncOptions,
  JwtModuleOptions,
  JwtService,
} from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const data = config.get('ACCESS_CONFIG') as JwtModuleOptions;
        console.log(data);
        return data;
      },
    }),
  ],
  providers: [
    {
      provide: 'ACCESS_JWT',
      useExisting: JwtService,
    },
  ],
  exports: ['ACCESS_JWT'],
})
export class AccessModule {}
