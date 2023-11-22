import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { HospitalsRepository } from "../../repositories/hospitals.repository";
import { SpecialtyDto } from "@brisacorp/common/dtos/hospitals/specialty.dto";

@Injectable()
export class FilterSpecialtyUseCase implements UseCase<SpecialtyDto[]> {
  constructor(private readonly hospitalsRepository: HospitalsRepository) {}

  public execute(): Promise<SpecialtyDto[]> {
    return this.hospitalsRepository.filterSpecialty();
  }
}
