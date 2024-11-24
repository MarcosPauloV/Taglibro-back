import { AssesmentType } from "@prisma/client";
import { Module } from "src/module/entities/module.entity";
import { User } from "src/users/entities/user.entity";

export class Assessment {
  id: number;
  moduleId: string;
  userId: string;
  assesmentName: string;
  type: AssesmentType;
  frequency?: number | null;
  grade?: number | null;
  createdAt: Date;
  updatedAt: Date;

  User: User;
  Module: Module;
}
