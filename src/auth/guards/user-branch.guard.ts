import { ExecutionContext, Injectable } from "@nestjs/common";

import { AccountGuard } from "./account.guard";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

@Injectable()
export class UserBranchGuard extends AccountGuard {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    jwtService: JwtService
  ) {
    super(jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.get<string>("role", context.getHandler());
    const account = request.account;
    const branchId = request.headers["branchid"];
    const accountId = account.accountId;
    if (!branchId || !accountId) {
      return false;
    }
    const branchUser = await this.prisma.branchUser.findFirst({
      where: { branchId: branchId, userId: accountId },
    });
    if (!branchUser || branchUser.role !== requiredRole) {
      return false;
    }

    return true;
  }
}
