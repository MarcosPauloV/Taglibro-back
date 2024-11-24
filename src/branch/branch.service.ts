import { ConflictException, Injectable } from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { Branch } from "./entities/branch.entity";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async create(branch: CreateBranchDto, institutionId: string): Promise<Branch> {
    const { name, cnpj, address: addressDto, slug } = branch;

    if (await this.prisma.branch.findUnique({ where: { cnpj } })) {
      throw new ConflictException("Cnpj already exists");
    }

    if (await this.prisma.branch.findUnique({ where: { slug } })) {
      throw new ConflictException("Slug already exists");
    }

    return this.prisma.branch.create({
      data: {
        name,
        cnpj,
        slug,
        institution: {
          connect: {
            id: institutionId,
          },
        },
        address: {
          create: {
            ...addressDto,
            number: +addressDto.number,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.branch.findMany();
  }

  async findBySlug(slug: string) {
    return await this.prisma.branch.findUnique({
      where: {
        slug,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.branch.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    const { address, ...rest } = updateBranchDto;
    return await this.prisma.branch.update({
      where: { id },
      data: {
        ...rest,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.branch.delete({
      where: {
        id,
      },
    });
  }
}
