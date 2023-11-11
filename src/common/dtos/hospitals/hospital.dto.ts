import { Exclude } from "class-transformer";

export class HospitalDto {
  public id?: string;
  public name: string;
  public cnpj: string;
  @Exclude()
  public password: string;
  public email: string;
  public phone: string;
}
