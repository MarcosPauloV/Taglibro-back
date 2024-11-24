import { Module } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { InstitutionController } from "./institution.controller";
import { BcryptAdapter } from "src/common/adapter/bcrypt-adapter";

@Module({
  imports: [PrismaModule],
  controllers: [InstitutionController],
  providers: [InstitutionService, BcryptAdapter],
  exports: [InstitutionService],
})
export class InstitutionModule {}
