import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";
import { HospitalsRepository } from "../../repositories/hospitals.repository";

@Injectable()
export class GetHospitalByIdUseCase implements UseCase<HospitalDto> {
  constructor(private readonly hospitalsRepository: HospitalsRepository) {}

  public execute(id: string): Promise<HospitalDto> {
    return this.hospitalsRepository.getById(id);
  }
}
