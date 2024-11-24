import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInDto, TypeLogin } from "./dto/sign-in.dto";
import { BcryptAdapter } from "src/common/adapter/bcrypt-adapter";
import { PrismaService } from "src/prisma/prisma.service";
import { Institution, User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private bcryptService: BcryptAdapter,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto) {
    let account: User | Institution = null;
    if (signInDto.type === TypeLogin.USER) {
      account = await this.prismaService.user.findUnique({
        where: {
          email: signInDto.identifier,
        },
      });
    } else {
      account = await this.prismaService.institution.findUnique({
        where: {
          cnpj: signInDto.identifier,
        },
      });
    }
    if (!account) throw new UnauthorizedException("Invalid credentials");

    const isPasswordMatch = await this.bcryptService.compare(signInDto.password, account.password);

    if (!isPasswordMatch) throw new UnauthorizedException("Invalid credentials");

    const jwtPayload = {
      accountId: account.id,
      userType: signInDto.type,
    };

    const token = this.jwtService.sign(jwtPayload);

    const payload = {
      token,
      accountId: account.id,
    };

    return payload;
  }
}
