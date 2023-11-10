import { Model } from "mongoose";
import { BaseEntity } from "./entities/base.entity";

export abstract class CrudDataSource<T extends BaseEntity> {
  protected constructor(private readonly model: Model<T>) {}

  async create(entity: T): Promise<T> {
    const createdEntity = new this.model(entity);
    return createdEntity.save() as Promise<T>;
  }

  async list(): Promise<T[]> {
    return this.model.find().exec();
  }

  async getById(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async query(filter: any): Promise<T[]> {
    const query: Record<string, any> = this.defaultQuery(filter);

    return this.model.find(query).exec();
  }

  protected defaultQuery(filter: any) {
    const query: Record<string, any> = {};

    if (filter.active) {
      query["active"] = filter.active;
    }

    return query;
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    const partial: Partial<T> = {};

    for (const key in entity) {
      if (entity[key] !== undefined) {
        partial[key] = entity[key];
      }
    }

    return this.model.findByIdAndUpdate(id, partial, { new: true }).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
