import "reflect-metadata";
import "es6-shim";
export * from "abstract-observable";
export * from "class-transformer";
export * from "./fetch-injection";
export * from "./store-collection";
export * from "./store";
export * from "./instance-registration-injection";
import { FetchInjection } from "./fetch-injection";
import { InstanceRegistrationInjection } from "./instance-registration-injection";
export var registerRootStore = InstanceRegistrationInjection.getInstanceRegistrationAction();
export function config(settings) {
    InstanceRegistrationInjection.inject(settings.registrationAction);
    FetchInjection.inject(settings.fetchAction);
    registerRootStore = InstanceRegistrationInjection.getInstanceRegistrationAction();
}
//# sourceMappingURL=main.js.map