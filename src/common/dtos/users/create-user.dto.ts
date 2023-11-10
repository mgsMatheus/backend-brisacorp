import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { CPFValidator } from "../../validators";

export class CreateUserDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @Validate(CPFValidator)
  public cpf: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @MaxLength(16, { message: "A senha deve ter no maximo 16 caracteres." })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @MinLength(10)
  @MaxLength(11)
  @IsNotEmpty()
  public phone: string;
}
