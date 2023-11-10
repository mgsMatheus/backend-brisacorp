import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/users.entity";
import { CrudDataSource } from "@brisacorp/common/base/data";

@Injectable()
export class UsersDataSource extends CrudDataSource<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
