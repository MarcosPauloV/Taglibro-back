import { Module } from "@nestjs/common";
import { BranchUserService } from "./branch-user.service";
import { BranchUserController } from "./branch-user.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BranchUserController],
  providers: [BranchUserService],
})
export class BranchUserModule {}
