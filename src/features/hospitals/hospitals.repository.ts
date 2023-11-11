import { Injectable } from "@nestjs/common";
import { CrudRepository } from "@brisacorp/common/base/data";
import { Hospital } from "./entities/hospitals.entity";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";
import { HospitalsDataSource } from "./hospitals.datasource";
import { HospitalMapper } from "./hospital.mapper";

@Injectable()
export class HospitalsRepository extends CrudRepository<
  Hospital,
  HospitalDto,
  HospitalsDataSource,
  HospitalMapper
> {
  constructor(
    private readonly hospitalsDataSource: HospitalsDataSource,
    private readonly hospitalMapper: HospitalMapper,
  ) {
    super(hospitalsDataSource, hospitalMapper);
  }
}
