export interface IPersistent<T> {
  persistInput(data: T): void;
  persistOutput(): T;
}
