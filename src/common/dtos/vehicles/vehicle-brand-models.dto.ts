import { VehiclesType } from "@brisacorp/common/enums";
import { VehicleModelDto } from "./vehicle-model.dto";

export class VehicleBrandModelsDto {
  public id?: string;
  public type: VehiclesType;
  public description: string;
  public models?: VehicleModelDto[];
}
