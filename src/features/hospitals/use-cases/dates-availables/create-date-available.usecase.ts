import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { DateAvailableDto } from "@brisacorp/common/dtos/hospitals/date-available.dto";
import { DatesAvailablesRepository } from "../../repositories/dates-availables.repository";
import { CreateDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/create-date-available.dto";

@Injectable()
export class CreateDateAvailableUseCase implements UseCase<DateAvailableDto> {
  constructor(private readonly repository: DatesAvailablesRepository) {}

  public execute(
    dateAvailable: CreateDateAvailableDTO,
  ): Promise<DateAvailableDto> {
    return this.repository.create(dateAvailable);
  }
}
