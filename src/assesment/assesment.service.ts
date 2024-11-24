import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { CreateAssessmentDto } from "./dto/create-assesment.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class AssesmentService {
  constructor(private prismaService: PrismaService) {}

  async create(createAssesmentDto: CreateAssessmentDto, teacherId: string, branchId: string) {
    const { moduleId, userId, ...data } = createAssesmentDto;

    if (!createAssesmentDto.frequency && !createAssesmentDto.grade) {
      throw new BadRequestException("frequency or grade is required");
    }

    const branchUser = await this.prismaService.branchUser.findUnique({
      where: { userId_branchId: { userId: teacherId, branchId } },
    });
    if (branchUser.role !== Role.USER) {
      throw new ForbiddenException("You are not allowed to create assesment");
    }
    await this.prismaService.assesment.create({
      data: {
        Module: { connect: { id: moduleId } },
        User: { connect: { id: userId } },
        ...data,
      },
    });
  }

  async findByModule(moduleId: string) {
    return await this.prismaService.assesment.findMany({
      where: { moduleId },
    });
  }

  async findByUser(userId: string) {
    return await this.prismaService.assesment.findMany({
      where: { userId },
    });
  }
}
