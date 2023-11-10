import { IsNotEmpty, MaxLength, MinLength, Validate } from "class-validator";
import { CPFValidator } from "@brisacorp/common/validators/cpf.validator";

export class UserAuthenticateDto {
  public id?: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @Validate(CPFValidator)
  public cpf: string;

  @IsNotEmpty()
  @MaxLength(16)
  public password: string;

  constructor(partial?: Partial<UserAuthenticateDto>) {
    Object.assign(this, partial);
  }
}
