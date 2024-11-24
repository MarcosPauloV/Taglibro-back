import { TypeLogin } from "../dto/sign-in.dto";

export class JwtPayload {
  type: TypeLogin;
  accountId: string;
}
