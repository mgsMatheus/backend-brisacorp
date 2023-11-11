import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { CreateHospitalUseCase } from "./use-cases";
import { MongooseModule } from "@nestjs/mongoose";
import { CryptService } from "@brisacorp/common/providers";
import { JwtAuthGuardModule } from "@brisacorp/common/security";
import { HospitalsController } from "./hospitals.controller";
import { Hospital, HospitalSchema } from "./entities/hospitals.entity";
import { HospitalMapper } from "./hospital.mapper";
import { HospitalsDataSource } from "./hospitals.datasource";
import { HospitalsRepository } from "./hospitals.repository";

const usecases = [CreateHospitalUseCase];

@Module({
  controllers: [HospitalsController],
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
    ]),
    PassportModule,
    JwtAuthGuardModule,
  ],
  providers: [
    ...usecases,
    HospitalMapper,
    HospitalsDataSource,
    HospitalsRepository,
    CryptService,
  ],
})
export class HospitalsModules {}
