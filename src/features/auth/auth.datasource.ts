import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { Hospital } from "./entities/hospital.entity";

@Injectable()
export class AuthDataSource {
  constructor(
    @InjectModel(User.name) private readonly authUserModel: Model<User>,
    @InjectModel(Hospital.name)
    private readonly authHospitalModel: Model<Hospital>,
  ) {}

  public async getByCPF(cpf: string): Promise<User> {
    return this.authUserModel
      .findOne({
        cpf,
      })
      .exec();
  }

  public async getByCNPJ(cnpj: string): Promise<Hospital> {
    return this.authHospitalModel
      .findOne({
        cnpj,
      })
      .exec();
  }
}
