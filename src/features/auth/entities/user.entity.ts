import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
