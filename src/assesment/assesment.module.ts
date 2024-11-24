import { Module } from "@nestjs/common";
import { AssesmentService } from "./assesment.service";
import { AssesmentController } from "./assesment.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AssesmentController],
  providers: [AssesmentService],
})
export class AssesmentModule {}
