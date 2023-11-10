import { BookingStatus } from "@brisacorp/common/enums/booking-status.enum";

export class BookingDto {
  public id: number;
  public startDateTime: Date;
  public endDateTime: Date;
  public parking: { ownerDocument: string; code: string };
  public vehicle: { ownerDocument: string; plate: string };
  public status: BookingStatus;
  public amount: number;
}
