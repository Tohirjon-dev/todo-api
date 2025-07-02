import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateUser } from './dto/update-user.dto';
import { hashPassword } from 'src/common/utils/hash.utils';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        role: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async getUserById(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser)
      throw new NotFoundException('Bunda id li foydalanuvchi  topilmadi');
    return findUser;
  }
  async updateUserById(id: number, dto: updateUser) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser)
      throw new NotFoundException('Bunda id li foydalanuvchi  topilmadi');
    const hashedPassword = await hashPassword(dto.password);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return "Foydalanuvchi paroli o'zgartirildi";
  }
  async deleteUserById(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });
    if (!findUser)
      throw new NotFoundException('Bunda id li foydalanuvchi  topilmadi');
    await this.prisma.user.delete({ where: { id } });
    return "Foydalanuvchi o'chirib yuborildi";
  }
}
