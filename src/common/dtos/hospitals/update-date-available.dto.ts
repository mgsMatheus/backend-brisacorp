import { IsNotEmpty } from "class-validator";

export class UpdateStatusDateAvailableDTO {
  @IsNotEmpty()
  status: boolean;
}
