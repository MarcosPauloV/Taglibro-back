import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { InstitutionModule } from "./institution/institution.module";
import { PrismaService } from "./prisma/prisma.service";
import { BranchModule } from "./branch/branch.module";
import { CourseModule } from "./course/course.module";
import { BranchUserModule } from "./branch-user/branch-user.module";
import { UserCourseModule } from "./user-course/user-course.module";
import { ModuleModule } from "./module/module.module";
import { AuthModule } from "./auth/auth.module";
import { AssesmentModule } from "./assesment/assesment.module";

@Module({
  imports: [
    UsersModule,
    InstitutionModule,
    BranchModule,
    CourseModule,
    BranchUserModule,
    UserCourseModule,
    ModuleModule,
    AssesmentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
