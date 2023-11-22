import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { ConsultDto } from "@brisacorp/common/dtos/hospitals/consult.dto";
import { ConsultsRepository } from "../../repositories/consults.repository";

@Injectable()
export class GetConsultByUserIdUseCase implements UseCase<ConsultDto[]> {
  constructor(private readonly repository: ConsultsRepository) {}

  public execute(user: string): Promise<ConsultDto[]> {
    return this.repository.getByUserId(user);
  }
}
