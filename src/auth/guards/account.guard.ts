import { ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

import { AuthGuard } from "./auth.guard";
import { TypeLogin } from "../dto/sign-in.dto";

@Injectable()
export class AccountGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const account = request.account;

    if (account.userType !== TypeLogin.USER)
      throw new ForbiddenException("You don't have permission to access this resource");

    return true;
  }
}
