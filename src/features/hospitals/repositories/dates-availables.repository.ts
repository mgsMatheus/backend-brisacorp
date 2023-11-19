import { Injectable } from "@nestjs/common";
import { CrudRepository } from "@brisacorp/common/base/data";
import { DateAvailable } from "../entities/dates-availables.entity";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { DatesAvailablesDataSource } from "../datasources/dates-availables.datasource";
import { DateAvailableMapper } from "../mappers/dates-availables.mapper";

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
}
