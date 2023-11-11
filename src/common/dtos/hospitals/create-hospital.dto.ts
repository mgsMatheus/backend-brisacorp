import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateHospitalDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @MinLength(14)
  @MaxLength(14)
  public cnpj: string;

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
