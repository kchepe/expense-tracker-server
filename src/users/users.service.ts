import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { hashPassword } from 'src/utils/password.utils';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  public async createUser(newUser: CreateUserInput) {
    const user = await this.findUserByEmail(newUser.email);
    if (user) {
      return {
        success: false,
        message: 'Email address already exist',
        data: null,
      };
    } else {
      const newUserCopy = { ...newUser };
      newUserCopy.password = await hashPassword(newUser.password);
      const { id, email, password } = await this.prisma.users.create({
        data: newUserCopy,
      });

      return {
        success: true,
        message: 'User successfully added!',
        data: { id, email, password },
      };
    }
  }

  public async removeUser(id: string) {
    const response = await this.prisma.users.delete({ where: { id } });
    return response;
  }

  public async findAll() {
    const response = await this.prisma.users.findMany();
    return response;
  }

  public async findUserByEmail(email: string) {
    const response = await this.prisma.users.findUnique({
      where: { email },
    });
    return response;
  }

  public async findUserById(id: string) {
    const response = await this.prisma.users.findFirst({
      where: { id },
    });
    return response;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
