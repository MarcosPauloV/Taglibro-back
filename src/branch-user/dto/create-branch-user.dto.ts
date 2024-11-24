import { Role } from "../entities/branch-user.entity";

export class CreateBranchUserDto {
  userId: string;
  branchId: string;
  role: Role;
}
