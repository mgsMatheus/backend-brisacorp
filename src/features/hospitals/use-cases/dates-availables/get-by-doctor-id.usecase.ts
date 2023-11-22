import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { DatesAvailablesRepository } from "../../repositories/dates-availables.repository";

@Injectable()
export class GetByDoctorIdUseCase implements UseCase<DateAvailableDto[]> {
  constructor(private readonly repository: DatesAvailablesRepository) {}

  public execute(doctorId: string): Promise<DateAvailableDto[]> {
    return this.repository.getByDoctorId(doctorId);
  }
}
