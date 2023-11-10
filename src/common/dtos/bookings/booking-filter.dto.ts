import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BookingStatus } from "@brisacorp/common/enums/booking-status.enum";

export class BookingVehicleFilter {
  @ApiProperty({ name: "vehicle.plate" })
  plate?: string;

  @ApiProperty({ name: "vehicle.ownerDocument" })
  ownerDocument?: string;
}

export class BookingParkingFilter {
  @ApiProperty({ name: "parking.code" })
  code?: string;

  @ApiProperty({ name: "parking.ownerDocument" })
  ownerDocument?: string;
}

export class BookingFilterDto {
  public status?: BookingStatus;

  @ApiPropertyOptional({ type: BookingVehicleFilter })
  public vehicle?: BookingVehicleFilter;
  public parking?: BookingParkingFilter;
  public ownerDocument?: string;
}
