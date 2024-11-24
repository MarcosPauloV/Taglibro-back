export class SignInDto {
  identifier: string;
  type: TypeLogin;
  password: string;
}
export enum TypeLogin {
  USER = "USER",
  INSTITUTION = "INSTITUTION",
}
