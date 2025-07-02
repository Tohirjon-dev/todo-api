import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const data = config.get('REFRESH_CONFIG') as JwtModuleOptions;
        console.log(data);
        return data;
      },
    }),
  ],
  providers: [
    {
      provide: 'REFRESH_JWT',
      useExisting: JwtService,
    },
  ],
  exports: ['REFRESH_JWT'],
})
export class RefreshModule {}
