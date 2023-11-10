import { BookingStatus } from "@brisacorp/common/enums/booking-status.enum";
import { IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateBookingDto {
  id: number;

  @IsNotEmpty()
  @IsDate()
  public startDateTime: Date;

  @IsNotEmpty()
  @IsDate()
  public endDateTime: Date;

  @IsNotEmpty()
  public vehicle: { ownerDocument: string; plate: string };

  @IsNotEmpty()
  public parking: { ownerDocument: string; code: string };

  @IsEnum(BookingStatus)
  public status: BookingStatus;

  @IsNotEmpty()
  public amount: number;
}
