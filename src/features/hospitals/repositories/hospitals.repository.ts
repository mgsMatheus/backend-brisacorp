import { Injectable } from "@nestjs/common";
import { CrudRepository } from "@brisacorp/common/base/data";
import { Hospital } from "../entities/hospitals.entity";
import { HospitalDto } from "@brisacorp/common/dtos/hospitals/hospital.dto";
import { HospitalsDataSource } from "../datasources/hospitals.datasource";
import { HospitalMapper } from "../mappers/hospital.mapper";
import { Doctor } from "../entities/doctors.entity";
import { DoctorDto } from "@brisacorp/common/dtos/hospitals/doctor.dto";

@Injectable()
export class HospitalsRepository extends CrudRepository<
  Hospital,
  HospitalDto,
  HospitalsDataSource,
  HospitalMapper
> {
  constructor(
    private readonly hospitalsDataSource: HospitalsDataSource,
    private readonly hospitalMapper: HospitalMapper,
  ) {
    super(hospitalsDataSource, hospitalMapper);
  }
  public async createDoctor(
    hospitalId: string,
    doctor: Doctor,
  ): Promise<DoctorDto> {
    return await this.hospitalsDataSource.createDoctor(hospitalId, doctor);
  }
  public async getDoctors(
    hospitalId: string,
    doctor: string,
    specialty: string,
  ): Promise<DoctorDto[]> {
    return await this.hospitalsDataSource.getDoctors(
      hospitalId,
      doctor,
      specialty,
    );
  }

  public async getDoctorById(id: string): Promise<DoctorDto[]> {
    return await this.hospitalsDataSource.getDoctorById(id);
  }
}
