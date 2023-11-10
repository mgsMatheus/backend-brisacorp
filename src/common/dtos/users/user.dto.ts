import { Exclude } from "class-transformer";

export class UserDto {
  public id?: string;
  public name: string;
  public cpf: string;
  @Exclude()
  public password: string;
  public email: string;
  public phone: string;
}
