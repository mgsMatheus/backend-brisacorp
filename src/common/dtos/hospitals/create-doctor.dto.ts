import { IsNotEmpty } from "class-validator";

export class CreateDoctorDTO {
  @IsNotEmpty()
  public name: string;
  @IsNotEmpty()
  public specialty: string;
}
