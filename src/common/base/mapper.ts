export interface Mapper<TEntity, TDto> {
  toEntity(dto: Partial<TDto>): TEntity;
  toDto(entity: TEntity): TDto;
}
