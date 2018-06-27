import { Exclude } from "class-transformer";
import { Observable } from "abstract-observable";

export abstract class Store<T> extends Observable {
  [key: string]: any;
  @Exclude()
  public parent: Store<any> | undefined;
  public constructor(parent?: Store<any>) {
    super(parent);
    this.setParent(parent);
  }
  public setParent(parent: any): void {
    this.parent = parent;
  }
  public setField(fieldName: string, value: any) {
    this[fieldName] = value;
  }
}
export default Store;
