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
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDeco } from 'src/common/decorators/roles.decorator';
import { updateUser } from './dto/update-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@RolesDeco('ADMIN', 'SUPERADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('users')
  async getAll() {
    try {
      return await this.adminService.getAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.adminService.getUserById(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Patch('users/:id')
  async updateUSer(@Body() body: updateUser, @Param('id') id: string) {
    try {
      return await this.adminService.updateUserById(+id, body);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.adminService.deleteUserById(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
