import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import {
  CreateDoctorUseCase,
  CreateHospitalUseCase,
  FilterSpecialtyUseCase,
  GetDatesBySpecialtyUseCase,
  GetDoctorByIdUseCase,
  GetDoctorsUseCase,
  GetHospitalByIdUseCase,
  GetHourAvailableUseCase,
} from "./use-cases/hospitals";
import { MongooseModule } from "@nestjs/mongoose";
import { CryptService } from "@brisacorp/common/providers";
import { JwtAuthGuardModule } from "@brisacorp/common/security";
import { HospitalsController } from "./controllers/hospitals.controller";
import { Hospital, HospitalSchema } from "./entities/hospitals.entity";
import { HospitalMapper } from "./mappers/hospital.mapper";
import { HospitalsDataSource } from "./datasources/hospitals.datasource";
import { HospitalsRepository } from "./repositories/hospitals.repository";
import {
  CreateDateAvailableUseCase,
  DeleteDateAvailableUseCase,
  GetByDoctorIdUseCase,
  GetDoctorsAvailableUseCase,
} from "./use-cases/dates-availables";
import { DatesAvailablesController } from "./controllers/dates-availables.controller";
import {
  DateAvailable,
  DateAvailableSchema,
} from "./entities/dates-availables.entity";
import { DateAvailableMapper } from "./mappers/dates-availables.mapper";
import { DatesAvailablesDataSource } from "./datasources/dates-availables.datasource";
import { DatesAvailablesRepository } from "./repositories/dates-availables.repository";

const usecases = [
  CreateHospitalUseCase,
  GetHospitalByIdUseCase,
  CreateDoctorUseCase,
  GetDoctorsUseCase,
  CreateDateAvailableUseCase,
  GetDoctorByIdUseCase,
  GetByDoctorIdUseCase,
  DeleteDateAvailableUseCase,
  FilterSpecialtyUseCase,
  GetDatesBySpecialtyUseCase,
  GetHourAvailableUseCase,
  GetDoctorsAvailableUseCase,
];

@Module({
  controllers: [HospitalsController, DatesAvailablesController],
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
      { name: DateAvailable.name, schema: DateAvailableSchema },
    ]),
    PassportModule,
    JwtAuthGuardModule,
  ],
  providers: [
    ...usecases,
    HospitalMapper,
    HospitalsDataSource,
    HospitalsRepository,
    DateAvailableMapper,
    DatesAvailablesDataSource,
    DatesAvailablesRepository,
    CryptService,
  ],
})
export class HospitalsModules {}
