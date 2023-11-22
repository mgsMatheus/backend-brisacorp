import { Injectable } from "@nestjs/common";
import { Mapper } from "@brisacorp/common/base/mapper";
import { ConsultDto } from "@brisacorp/common/dtos/hospitals/consult.dto";
import { Consult, ConsultDocument } from "../entities/consults.entity";

@Injectable()
export class ConsultMapper implements Mapper<Consult, ConsultDto> {
  public toDto(entity: ConsultDocument): ConsultDto {
    const { id, userId, nameDoctor, date, nameHospital, specialty } = entity;

    const dto = new ConsultDto();
    dto.id = id;
    dto.nameDoctor = nameDoctor;
    dto.date = date;
    dto.nameHospital = nameHospital;
    dto.userId = userId;
    dto.specialty = specialty;
    return dto;
  }

  public toEntity(dto: ConsultDto): Consult {
    const { userId, nameDoctor, date, nameHospital, specialty } = dto;

    const dateAvailable = new Consult();
    dateAvailable.userId = userId;
    dateAvailable.nameDoctor = nameDoctor;
    dateAvailable.date = date;
    dateAvailable.nameHospital = nameHospital;
    dateAvailable.specialty = specialty;
    return dateAvailable;
  }
}
