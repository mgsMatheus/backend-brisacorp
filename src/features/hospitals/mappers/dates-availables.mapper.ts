import { Injectable } from "@nestjs/common";
import { Mapper } from "@brisacorp/common/base/mapper";
import {
  DateAvailable,
  DateAvailableDocument,
} from "../entities/dates-availables.entity";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";

@Injectable()
export class DateAvailableMapper
  implements Mapper<DateAvailable, DateAvailableDto>
{
  public toDto(entity: DateAvailableDocument): DateAvailableDto {
    const { id, doctorId, date, hour } = entity;

    const dto = new DateAvailableDto();
    dto.id = id;
    dto.doctorId = doctorId;
    dto.date = date;
    dto.hour = hour;
    return dto;
  }

  public toEntity(dto: DateAvailableDto): DateAvailable {
    const { doctorId, date, hour } = dto;

    const dateAvailable = new DateAvailable();
    dateAvailable.doctorId = doctorId;
    dateAvailable.date = date;
    dateAvailable.hour = hour;
    return dateAvailable;
  }
}
