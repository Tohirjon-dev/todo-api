import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@RolesDeco('SUPERADMIN')
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}
  @Patch(':id')
  async createAdmin(@Param('id') id: string) {
    try {
      const data = await this.superAdminService.createAdmin(+id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
