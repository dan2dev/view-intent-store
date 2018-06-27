import { RootStore } from "./root-store";
import { Generic } from "./generic";
export declare abstract class Store<T> extends Generic {
    rootStore: RootStore | undefined;
    constructor(rootStore?: RootStore);
    setParent(rootStore: any): void;
}
export default Store;
