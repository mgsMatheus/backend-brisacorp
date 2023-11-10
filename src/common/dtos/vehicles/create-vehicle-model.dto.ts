import { IsNotEmpty } from "class-validator";

export class CreateVehicleModelDTO {
  @IsNotEmpty({
    message: "description é um campo obrigatório",
  })
  public description: string;
}
