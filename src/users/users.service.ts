import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { BcryptAdapter } from "src/common/adapter/bcrypt-adapter";

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private bcryptService: BcryptAdapter
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;

    // Verifique se o e-mail já existe
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("Email já cadastrado");
    }

    const hashedPassword = await this.bcryptService.hash(password);
    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        rg: createUserDto.rg,
        cpf: createUserDto.cpf,
        address: {
          create: {
            ...createUserDto.adressDto,
          },
        },
        bornDate: createUserDto.bornDate,
        phoneNumber: createUserDto.phoneNumber,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found with id: " + id);
    }
    return user;
  }

  async findByInstitutionId(institutionId: string) {
    return await this.prismaService.user.findMany({
      where: {
        BranchUser: {
          some: {
            branch: {
              institutionId: institutionId,
            },
          },
        },
      },
      include: {
        BranchUser: {
          include: {
            branch: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { adressDto, ...updateUserDtoWithoutAdress } = updateUserDto;
    const updateMap = {
      ...updateUserDtoWithoutAdress,
    };
    if (adressDto) {
      updateMap["address"] = this.prismaService.address.create({
        data: {
          ...adressDto,
        },
      });
    }
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateMap,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
