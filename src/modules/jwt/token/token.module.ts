import { Global, Module } from '@nestjs/common';
import { AccessModule } from '../access.module';
import { RefreshModule } from '../refresh.module';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [AccessModule, RefreshModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
