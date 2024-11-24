export class BranchUser {
  userId: string;
  branchId: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  STUDENT = "STUDENT",
}
