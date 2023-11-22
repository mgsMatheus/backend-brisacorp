import { Injectable } from "@nestjs/common";
import { CrudRepository } from "@brisacorp/common/base/data";
import { DateAvailable } from "../entities/dates-availables.entity";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { DatesAvailablesDataSource } from "../datasources/dates-availables.datasource";
import { DateAvailableMapper } from "../mappers/dates-availables.mapper";
import { DatesAvailablesDto } from "@brisacorp/common/dtos/hospitals/dates-availables.dto";

@Injectable()
export class DatesAvailablesRepository extends CrudRepository<
  DateAvailable,
  DateAvailableDto,
  DatesAvailablesDataSource,
  DateAvailableMapper
> {
  constructor(
    private readonly datesAvailabesDataSource: DatesAvailablesDataSource,
    private readonly dateAvailabeMapper: DateAvailableMapper,
  ) {
    super(datesAvailabesDataSource, dateAvailabeMapper);
  }
  public getByDoctorId(id: string): Promise<DateAvailableDto[]> {
    return this.datesAvailabesDataSource.getByDoctorId(id);
  }

  public getDoctorsAvailable(
    specialty: string,
    date: string,
  ): Promise<DatesAvailablesDto[]> {
    return this.datesAvailabesDataSource.getDoctorsAvailable(specialty, date);
  }

  public updateStatusDateAvailable(id: string, status: boolean) {
    return this.datesAvailabesDataSource.updateStatusDateAvailable(id, status);
  }
}
