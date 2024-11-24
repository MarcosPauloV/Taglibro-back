import { CreateAdressDto } from "src/adress/dto/create-adress.dto";

export class CreateUserDto {
  name: string;
  rg: string;
  cpf: string;
  bornDate: Date;
  adressDto: CreateAdressDto;
  phoneNumber: string;
  email: string;
  password: string;
}
