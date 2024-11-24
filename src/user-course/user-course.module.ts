import { Module } from "@nestjs/common";
import { UserCourseService } from "./user-course.service";
import { UserCourseController } from "./user-course.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserCourseController],
  providers: [UserCourseService],
})
export class UserCourseModule {}
