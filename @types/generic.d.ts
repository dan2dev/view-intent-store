import { Observable } from "abstract-observable";
export declare abstract class Generic extends Observable {
    parent?: Generic;
    constructor(parent?: Generic);
    setField(fieldName: string, value: any): void;
}
export default Generic;
