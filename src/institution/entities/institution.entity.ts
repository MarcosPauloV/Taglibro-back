import { LegalNature } from "@prisma/client";

export class Institution {
  id: string;
  name: string;
  cnpj: string;
  legalNature: LegalNature;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
