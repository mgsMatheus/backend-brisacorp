import { Injectable } from "@nestjs/common";
import { CrudRepository } from "@brisacorp/common/base/data";
import { Consult } from "../entities/consults.entity";
import { ConsultDto } from "@brisacorp/common/dtos/hospitals/consult.dto";
import { ConsultsDataSource } from "../datasources/consults.datasource";
import { ConsultMapper } from "../mappers/consults.mapper";

@Injectable()
export class ConsultsRepository extends CrudRepository<
  Consult,
  ConsultDto,
  ConsultsDataSource,
  ConsultMapper
> {
  constructor(
    private readonly consultDataSource: ConsultsDataSource,
    private readonly consultMapper: ConsultMapper,
  ) {
    super(consultDataSource, consultMapper);
  }

  public getByUserId(userId: string): Promise<ConsultDto[]> {
    return this.consultDataSource.getByUserId(userId);
  }
}
