import { Injectable } from "@nestjs/common";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Module } from "./entities/module.entity";

@Injectable()
export class ModuleService {
  constructor(readonly prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    return await this.prisma.module.create({ data: createModuleDto });
  }

  async findAll(): Promise<Module[]> {
    return await this.prisma.module.findMany();
  }

  async findOne(id: string): Promise<Module | null> {
    return await this.prisma.module.findUnique({ where: { id } });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    return await this.prisma.module.update({
      where: { id },
      data: updateModuleDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.module.delete({ where: { id } });
  }
}
