import { Injectable } from "@nestjs/common";
import { UseCase } from "@brisacorp/common/base";
import { CryptService } from "@brisacorp/common/providers";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";
import { HospitalsRepository } from "../../repositories/hospitals.repository";
import { CreateHospitalDto } from "@brisacorp/common/dtos/hospitals/create-hospital.dto";

@Injectable()
export class CreateHospitalUseCase implements UseCase<HospitalDto> {
  constructor(
    private readonly repository: HospitalsRepository,
    private readonly cryptService: CryptService,
  ) {}

  public execute(hospital: CreateHospitalDto): Promise<HospitalDto> {
    return this.cryptService
      .hash(hospital.password)
      .then((password) => this.repository.create({ ...hospital, password }));
  }
}
