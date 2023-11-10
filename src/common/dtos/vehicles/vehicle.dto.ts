import { VehicleBody } from "@brisacorp/common/enums";
import { IsNotEmpty } from "class-validator";
import { VehicleModelDto } from "./vehicle-model.dto";
import { VehicleBrandDto } from "./vehicle-brand.dto";
import { CreateVehicleDto } from "./create-vehicle.dto";

export class VehicleDto {
  public id?: string;

  @IsNotEmpty()
  public model: VehicleModelDto & { brand: VehicleBrandDto };

  @IsNotEmpty()
  public body: VehicleBody;

  @IsNotEmpty()
  public year: string;

  @IsNotEmpty()
  public plate: string;

  public ownerDocument: string;

  public static fromCreate(create: CreateVehicleDto) {
    return <VehicleDto>{
      body: create.body,
      model: {
        id: create.model,
      },
      ownerDocument: create.ownerDocument,
      plate: create.plate,
      year: create.year,
    };
  }
}
