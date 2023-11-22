import { Injectable } from "@nestjs/common";
import { DatesAvailablesRepository } from "../../repositories/dates-availables.repository";

@Injectable()
export class UpdateStatusDateAvailableUseCase {
  constructor(private readonly repository: DatesAvailablesRepository) {}

  public execute(id: string, status: boolean) {
    return this.repository.updateStatusDateAvailable(id, status);
  }
}
