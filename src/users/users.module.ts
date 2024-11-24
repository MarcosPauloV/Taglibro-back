import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { BcryptAdapter } from "src/common/adapter/bcrypt-adapter";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, BcryptAdapter],
})
export class UsersModule {}
