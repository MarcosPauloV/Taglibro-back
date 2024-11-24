import { Injectable } from "@nestjs/common";
import { CreateBranchUserDto } from "./dto/create-branch-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BranchUserService {
  constructor(private prisma: PrismaService) {}

  async create(createBranchUser: CreateBranchUserDto) {
    return await this.prisma.branchUser.create({
      data: {
        ...createBranchUser,
      },
    });
  }

  async findAll(branchId: string) {
    return await this.prisma.branchUser.findMany({ where: { branchId } });
  }

  async findOne(userId: string, branchId: string) {
    return await this.prisma.branchUser.findUnique({
      where: { userId_branchId: { userId, branchId } },
    });
  }

  // update(id: number, updateBranchUserDto: UpdateBranchUserDto) {
  //   return `This action updates a #${id} branchUser`;
  // }
}
