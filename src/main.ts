import "reflect-metadata";
import "es6-shim";
export * from "abstract-observable";
export * from "class-transformer";
export * from "./fetch-injection";
export * from "./store-persist";
export * from "./store-collection";
export * from "./store";
export * from "./instance-registration-injection";
import { FetchAction, FetchInjection } from "./fetch-injection";
import { InstanceRegistrationAction, InstanceRegistrationInjection } from "./instance-registration-injection";
export interface IConfigSettings {
  fetchAction: FetchAction;
  registrationAction: InstanceRegistrationAction;
}
export function config(settings: IConfigSettings) {
  InstanceRegistrationInjection.inject(settings.registrationAction);
  FetchInjection.inject(settings.fetchAction);
}
export const registerRootStore: InstanceRegistrationAction = InstanceRegistrationInjection.getInstanceRegistrationAction();
