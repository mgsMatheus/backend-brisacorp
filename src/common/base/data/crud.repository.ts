// categories.repository.ts

import { Injectable } from "@nestjs/common";
import { Mapper } from "@brisacorp/common/base/mapper";
import { CrudDataSource } from "./crud.datasource";
import { BaseEntity } from "./entities/base.entity";

@Injectable()
export abstract class CrudRepository<
  TEntity extends BaseEntity,
  TDto,
  TDataSource extends CrudDataSource<TEntity>,
  TMapper extends Mapper<TEntity, TDto>,
> {
  protected constructor(
    private readonly datasource: TDataSource,
    private readonly mapper: TMapper,
  ) {}

  public async create(data: TDto): Promise<TDto> {
    const entity = await this.mapToEntity(data);
    const created = await this.datasource.create(entity);
    return this.mapper.toDto(created);
  }

  public async list(): Promise<TDto[]> {
    const items = await this.datasource.list();
    return items.map((category) => this.mapper.toDto(category));
  }

  public async getById(id: string): Promise<TDto> {
    const entity = await this.datasource.getById(id);
    return entity ? this.mapper.toDto(entity) : null;
  }

  public async update(id: string, data: Partial<TDto>): Promise<TDto> {
    const entity = await this.mapToEntity(data);
    const updated = await this.datasource.update(id, entity);
    return this.mapper.toDto(updated);
  }

  public async delete(id: string): Promise<TDto> {
    const deleted = await this.datasource.delete(id);
    return this.mapper.toDto(deleted);
  }

  protected async mapToEntity(data: Partial<TDto>): Promise<TEntity> {
    return this.mapper.toEntity(data);
  }
}
