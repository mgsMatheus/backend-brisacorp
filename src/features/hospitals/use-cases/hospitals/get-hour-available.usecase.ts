import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { HospitalsRepository } from "../../repositories/hospitals.repository";
import { DatesAvailablesDto } from "@brisacorp/common/dtos/hospitals/dates-availables.dto";

@Injectable()
export class GetHourAvailableUseCase implements UseCase<DatesAvailablesDto[]> {
  constructor(private readonly hospitalsRepository: HospitalsRepository) {}

  public execute(
    specialty: string,
    date: string,
  ): Promise<DatesAvailablesDto[]> {
    return this.hospitalsRepository.getHourAvailable(specialty, date);
  }
}
