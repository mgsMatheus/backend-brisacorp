export interface UseCase<T> {
  execute(...params: any[]): Promise<T>;
}
