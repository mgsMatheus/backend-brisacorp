import { VehicleBody } from "@brisacorp/common/enums";
import { IsNotEmpty } from "class-validator";

export class CreateVehicleDto {
  @IsNotEmpty()
  public model: string;

  @IsNotEmpty()
  public body: VehicleBody;

  @IsNotEmpty()
  public year: string;

  @IsNotEmpty()
  public plate: string;

  public ownerDocument: string;
}
