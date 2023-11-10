import { ListParkingLocationDto } from "./list-parking-location.dto";

export class ParkingDto {
  public id?: string;
  public active: boolean;
  public code: string;
  public isOperating: boolean;
  public ownerDocument: string;
  public location: ListParkingLocationDto;
}
