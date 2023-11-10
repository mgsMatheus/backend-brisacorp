import { VehiclesType } from "@brisacorp/common/enums";

export class VehicleBrandDto {
  public id?: string;
  public type: VehiclesType;
  public description: string;
}
