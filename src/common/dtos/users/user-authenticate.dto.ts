import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserAuthenticateDto {
  public id?: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  public login: string;

  @IsNotEmpty()
  @MaxLength(16)
  public password: string;

  constructor(partial?: Partial<UserAuthenticateDto>) {
    Object.assign(this, partial);
  }
}
