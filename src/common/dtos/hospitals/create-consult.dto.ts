import { IsNotEmpty } from "class-validator";

export class CreateConsultDTO {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  nameDoctor: string;
  @IsNotEmpty()
  nameHospital: string;
  @IsNotEmpty()
  date: string;
  @IsNotEmpty()
  specialty: string;
}
