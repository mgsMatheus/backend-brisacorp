import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class BaseEntity {
  @Prop({ default: Date.now, type: Date })
  public createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  public updatedAt?: Date;

  @Prop({ default: true })
  public active?: boolean;
}

export const BaseSchema = SchemaFactory.createForClass(BaseEntity);

BaseSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
