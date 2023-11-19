import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { HospitalsRepository } from "../../repositories/hospitals.repository";
import { DoctorDto } from "@brisacorp/common/dtos/hospitals/doctor.dto";

@Injectable()
export class GetDoctorByIdUseCase implements UseCase<DoctorDto[]> {
  constructor(private readonly hospitalsRepository: HospitalsRepository) {}

  public execute(
    hospitalId: string,
    doctor: string,
    specialty: string,
  ): Promise<DoctorDto[]> {
    return this.hospitalsRepository.getDoctors(hospitalId, doctor, specialty);
  }
}
