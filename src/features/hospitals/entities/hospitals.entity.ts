import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "@brisacorp/common/base/data/entities/base.entity";
import { HydratedDocument } from "mongoose";

export type HospitalDocument = HydratedDocument<Hospital>;

@Schema()
export class Hospital extends BaseEntity {
  @Prop({ required: true, unique: true })
  public cnpj: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public phone: string;

  @Prop({ required: true })
  public password: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
