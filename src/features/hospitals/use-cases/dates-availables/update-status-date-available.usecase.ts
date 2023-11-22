import { Injectable } from "@nestjs/common";
import { DatesAvailablesRepository } from "../../repositories/dates-availables.repository";
import { UpdateStatusDateAvailableDTO } from "@brisacorp/common/dtos/hospitals/update-date-available.dto";

@Injectable()
export class UpdateStatusDateAvailableUseCase {
  constructor(private readonly repository: DatesAvailablesRepository) {}

  public execute(id: string, body: UpdateStatusDateAvailableDTO) {
    return this.repository.updateStatusDateAvailable(id, body);
  }
}
