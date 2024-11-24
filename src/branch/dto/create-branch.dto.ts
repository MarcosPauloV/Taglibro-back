import { CreateAdressDto } from "src/adress/dto/create-adress.dto";

export class CreateBranchDto {
  name: string;
  cnpj: string;
  slug: string;
  address: CreateAdressDto;
}
