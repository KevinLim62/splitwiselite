import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { passwordHash } from 'src/utils/hashing';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    createUserDto.password = await passwordHash(createUserDto.password);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User> | null {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: number): Promise<User> | null {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
