import "reflect-metadata";
import "es6-shim";
export * from "abstract-observable";
export * from "class-transformer";
export * from "./fetch-injection";
export * from "./store-persist";
export * from "./store-collection";
export * from "./store";
export * from "./instance-registration-injection";
import { FetchAction } from "./fetch-injection";
import { InstanceRegistrationAction } from "./instance-registration-injection";
export interface IConfigSettings {
    fetchAction: FetchAction;
    registrationAction: InstanceRegistrationAction;
}
export declare let registerRootStore: InstanceRegistrationAction;
export declare function config(settings: IConfigSettings): void;
