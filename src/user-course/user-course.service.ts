import { Injectable } from "@nestjs/common";
import { CreateUserCourseDto } from "./dto/create-user-course.dto";
import { UpdateUserCourseDto } from "./dto/update-user-course.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserCourseService {
  constructor(readonly prisma: PrismaService) {}

  async create(createUserCourseDto: CreateUserCourseDto) {
    const { userId, courseId } = createUserCourseDto;

    return await this.prisma.userCourse.create({
      data: {
        userId,
        courseId,
      },
    });
  }

  async findAll(courseId: string) {
    return await this.prisma.userCourse.findMany({
      where: {
        courseId,
      },
    });
  }

  // async findOne(id: number) {
  //   return await this.prisma.userCourse.findUnique({
  //     where: { id },
  //   });
  // }

  // async remove(userId: string, courseId: string) {
  //   return await this.prisma.userCourse.delete({
  //     where: { userId },
  //   })
}
