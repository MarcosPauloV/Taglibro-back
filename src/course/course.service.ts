import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Course } from "./entities/course.entity";

@Injectable()
export class CourseService {
  constructor(readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, branchId: string): Promise<Course> {
    return await this.prisma.course.create({
      data: { ...createCourseDto, branchId },
    });
  }

  async findAll(branchId: string): Promise<Course[]> {
    return await this.prisma.course.findMany({
      where: { branchId },
    });
  }

  async findOne(id: string): Promise<Course> {
    return await this.prisma.course.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
