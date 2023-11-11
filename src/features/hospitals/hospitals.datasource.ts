import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CrudDataSource } from "@brisacorp/common/base/data";
import { Hospital } from "./entities/hospitals.entity";

@Injectable()
export class HospitalsDataSource extends CrudDataSource<Hospital> {
  constructor(
    @InjectModel(Hospital.name)
    private readonly hospistalModel: Model<Hospital>,
  ) {
    super(hospistalModel);
  }
}
