import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import allConfig from './common/config/index';
import { TokenModule } from './modules/jwt/token/token.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResInterceptor } from './common/interceptors/resInterceptor';
import { AllExceptionFilter } from './common/filters/all-Exceptions.filter';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    PrismaModule,
    SuperAdminModule,
    AdminModule,
    AuthModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: allConfig,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
