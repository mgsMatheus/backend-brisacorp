import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { DatesAvailablesRepository } from "../../repositories/dates-availables.repository";
import { DatesAvailablesDto } from "@brisacorp/common/dtos/hospitals/dates-availables.dto";

@Injectable()
export class GetDoctorsAvailableUseCase
  implements UseCase<DatesAvailablesDto[]>
{
  constructor(private readonly repository: DatesAvailablesRepository) {}

  public execute(
    specialty: string,
    date: string,
  ): Promise<DatesAvailablesDto[]> {
    return this.repository.getDoctorsAvailable(specialty, date);
  }
}
