import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { hashPassword } from 'src/common/utils/hash.utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SuperAdminService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}
  async onModuleInit() {
    await this.createSuperAdmin();
  }
  async createSuperAdmin() {
    const findSuperAdmin = await this.prisma.user.findUnique({
      where: { email: process.env.SUPERADMIN_EMAIL },
    });
    if (findSuperAdmin) return;
    const hashedPassword = await hashPassword(process.env.SUPERADMIN_PASSWORD!);
    await this.prisma.user.create({
      data: {
        fullname: process.env.SUPERADMIN_FULLNAME!,
        email: process.env.SUPERADMIN_EMAIL!,
        password: hashedPassword,
        role: 'SUPERADMIN',
      },
    });
  }
  async createAdmin(id: number) {
    const findAdmin = await this.prisma.user.findUnique({ where: { id } });
    if (!findAdmin)
      throw new NotFoundException(`${id} idlik foydalanuvchi topilmadi!`);
    if (findAdmin.role === 'ADMIN')
      throw new BadRequestException(
        `${id} idlik foydalanuvchi allaqachon admin rolida!`,
      );
    await this.prisma.user.update({ where: { id }, data: { role: 'ADMIN' } });
    return `${id} idlik foydalanuvchiga ADMIN roli tayinlandi`;
  }
}
