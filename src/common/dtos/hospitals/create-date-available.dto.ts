import { IsNotEmpty } from "class-validator";

export class CreateDateAvailableDTO {
  @IsNotEmpty()
  public doctorId: string;
  @IsNotEmpty()
  public date: string;
  @IsNotEmpty()
  public hour?: string[];
}
