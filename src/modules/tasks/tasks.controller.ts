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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { userPayload } from 'src/common/interfaces/user-express.interface';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() user: userPayload,
  ) {
    try {
      return await this.tasksService.createTask(body, user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
  @Get()
  async getMyTasks(@CurrentUser() user: userPayload) {
    try {
      return await this.tasksService.getMyTasks(user.id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
