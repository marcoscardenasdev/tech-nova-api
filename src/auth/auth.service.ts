import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { CreateUserDto, LoginUserDto } from './dto';
import { PrismaService } from '../prisma.service';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async singUp(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: bcrypt.hashSync(password, 10),
        }
      });

      const { password: __, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async singIn(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        }
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: __, ...userWithoutPassword } = user;
      return {
        user: {
          ...userWithoutPassword
        },
        token: this.getJwtToken({ id: user.id, rol: user.rol })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign({ id: payload.id, rol: payload.rol });
  }

  private handleDBErrors(error: any) {
    if (error.code === 'P2002') {
      throw new ConflictException('Email already exists');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
