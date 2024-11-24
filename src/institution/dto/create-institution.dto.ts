import { LegalNature } from "@prisma/client";

export class CreateInstitutionDto {
  name: string;
  cnpj: string;
  legalNature: LegalNature;
  password: string;
}
