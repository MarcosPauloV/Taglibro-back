import { PartialType } from "@nestjs/mapped-types";
import { CreateBranchUserDto } from "./create-branch-user.dto";

export class UpdateBranchUserDto extends PartialType(CreateBranchUserDto) {}
