import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async createTask(dto: CreateTaskDto, userId: number) {
    await this.prisma.task.create({ data: { ...dto, userId } });
    return 'Task muvafaqiyatli yaratildi';
  }
  async getMyTasks(userId: number) {
    const tasks = await this.prisma.task.findMany({ where: { userId } });
    if (tasks.length === 0)
      throw new NotFoundException('Sizda birorta ham task yoq');
    return tasks;
  }
}
