import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { ConsultDto } from "@brisacorp/common/dtos/hospitals/consult.dto";
import { ConsultsRepository } from "../../repositories/consults.repository";
import { CreateConsultDTO } from "@brisacorp/common/dtos/hospitals/create-consult.dto";

@Injectable()
export class CreateConsultUseCase implements UseCase<ConsultDto> {
  constructor(private readonly repository: ConsultsRepository) {}

  public execute(consult: CreateConsultDTO): Promise<ConsultDto> {
    return this.repository.create(consult);
  }
}
