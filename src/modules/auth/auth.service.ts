import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/common/utils/hash.utils';
import { LoginDto } from './dto/login.dto';
import { TokenService } from '../jwt/token/token.service';
import { userPayload } from 'src/common/interfaces/user-express.interface';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}
  async register(dto: CreateAuthDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (findUser)
      throw new ConflictException(
        `Siz allaqachon ro'yxatdan o'tgansiz! Sizning id:${findUser.id}`,
      );
    const hashedPassword = await hashPassword(dto.password);
    const newUser = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
    return `Muvafaqiyatli ro'yxatdan o'tdingiz! Sizning id:${newUser.id}`;
  }
  async login(dto: LoginDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!findUser)
      throw new BadRequestException(
        "Email xato yoki siz registratsiyadan o'tmagansiz",
      );
    const isMatch = await comparePassword(dto.password, findUser.password);
    if (!isMatch) throw new BadRequestException('Parol xato!');
    const payload = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
    };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);
    return {
      message: 'Tizimga muvafaqiyatli kirdingiz',
      accessToken,
      refreshToken,
    };
  }
  async getMe(user: userPayload) {
    return await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        fullname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async updateMe(user: userPayload, dto: UpdateMeDto) {
    if (Object.keys(dto).length === 0)
      throw new BadRequestException(
        'update qilish uchun kamida bitta maydonni yuborishingiz kerak!',
      );
    await this.prisma.user.update({ where: { id: user.id }, data: dto });
    return 'Malumotlaringiz muvafaqiyatli yangilandi';
  }
}
