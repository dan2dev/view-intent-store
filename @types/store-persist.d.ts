export interface IPersistent<T> {
    persistInput(data: T): Promise<void>;
    persistOutput(): T;
}
