import * as bcrypt from "bcrypt";

const SALT_ROUTES = 12;
export class BcryptAdapter {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUTES);
  }

  async compare(password: any, hashedPassword: any): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
