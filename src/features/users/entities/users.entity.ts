import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseEntity {
  @Prop({ required: true, unique: true })
  public cpf: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public phone: string;

  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
