import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { BcryptAdapter } from "src/common/adapter/bcrypt-adapter";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { getJwtConfig } from "src/config/jwt.config";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptAdapter],
})
export class AuthModule {}
