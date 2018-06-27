import { Observable } from "abstract-observable";
export declare abstract class Store<T> extends Observable {
    [key: string]: any;
    parent: Store<any> | undefined;
    constructor(parent?: Store<any>);
    setParent(parent: any): void;
    setField(fieldName: string, value: any): void;
}
export default Store;
