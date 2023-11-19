import { UseCase } from "@brisacorp/common/base";
import { DoctorDto } from "@brisacorp/common/dtos/hospitals/doctor.dto";
import { Injectable } from "@nestjs/common";
import { HospitalsRepository } from "../../repositories/hospitals.repository";
import { CreateDoctorDTO } from "@brisacorp/common/dtos/hospitals/create-doctor.dto";

@Injectable()
export class CreateDoctorUseCase implements UseCase<DoctorDto> {
  constructor(private readonly hospitalRepository: HospitalsRepository) {}

  public execute(
    hospitalId: string,
    doctor: CreateDoctorDTO,
  ): Promise<DoctorDto> {
    return this.hospitalRepository.createDoctor(hospitalId, doctor);
  }
}
