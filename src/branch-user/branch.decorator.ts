import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Role } from "./entities/branch-user.entity";

export const CurrentBranch = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const branchId = request.headers["branchid"];

  return branchId;
});

export const AccessRole = (role: Role) => SetMetadata("role", role);
