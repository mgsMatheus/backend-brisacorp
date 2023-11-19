import { Injectable } from "@nestjs/common";
import { Mapper } from "@brisacorp/common/base/mapper";
import { Hospital, HospitalDocument } from "../entities/hospitals.entity";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";

@Injectable()
export class HospitalMapper implements Mapper<Hospital, HospitalDto> {
  public toDto(entity: HospitalDocument): HospitalDto {
    const { id, cnpj, name, email, password, phone } = entity;

    const dto = new HospitalDto();
    dto.id = id;
    dto.cnpj = cnpj;
    dto.name = name;
    dto.email = email;
    dto.password = password;
    dto.phone = phone;

    return dto;
  }

  public toEntity(dto: HospitalDto): Hospital {
    const { cnpj, name, email, password, phone } = dto;

    const user = new Hospital();
    user.name = name;
    user.cnpj = cnpj;
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;

    return user;
  }
}
