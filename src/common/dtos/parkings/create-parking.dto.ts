import { IsNotEmpty } from "class-validator";
import { ListParkingLocationDto } from "./list-parking-location.dto";

export class CreateParkingDto {
  @IsNotEmpty()
  public code: string;

  @IsNotEmpty()
  public location: ListParkingLocationDto;

  @IsNotEmpty()
  public isOperating: boolean;

  @IsNotEmpty()
  public ownerDocument: string;
}
