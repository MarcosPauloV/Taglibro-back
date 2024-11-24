import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateInstitutionDto } from "./dto/create-institution.dto";
import { UpdateInstitutionDto } from "./dto/update-institution.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Institution } from "./entities/institution.entity";
import { BcryptAdapter } from "src/common/adapter/bcrypt-adapter";

@Injectable()
export class InstitutionService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptAdapter
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
    const { name, cnpj, legalNature, password } = createInstitutionDto;

    if (await this.prisma.institution.findUnique({ where: { cnpj } })) {
      throw new ConflictException("Cnpj already exists");
    }

    const hashedPassword = await this.bcryptService.hash(password);
    const institution = await this.prisma.institution.create({
      data: {
        name,
        cnpj,
        legalNature,
        password: hashedPassword,
      },
    });

    return institution;
  }

  async findAll(): Promise<Institution[]> {
    return await this.prisma.institution.findMany();
  }

  async findOne(id: string): Promise<Institution | undefined> {
    return await this.prisma.institution.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateInstitutionDto: UpdateInstitutionDto): Promise<UpdateInstitutionDto> {
    if (!(await this.findOne(id))) {
      throw new NotFoundException("Institution not found");
    }

    const { name, cnpj, legalNature, password } = updateInstitutionDto;

    await this.prisma.institution.update({
      where: { id },
      data: {
        name,
        cnpj,
        legalNature,
        password,
      },
    });

    return;
  }

  async remove(id: string) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException("Institution not found");
    }

    await this.prisma.institution.delete({
      where: { id },
    });

    return "Institution deleted";
  }
}
