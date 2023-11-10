import { VehiclesType } from "@brisacorp/common/enums";
import { IsNotEmpty } from "class-validator";

export class CreateVehicleBrandDTO {
  @IsNotEmpty({
    message: "type é um campo obrigatório",
  })
  public type: VehiclesType;

  @IsNotEmpty({
    message: "description é um campo obrigatório",
  })
  public description: string;
}
