export declare type InstanceRegistrationAction = <T>(stateName: string, stateRootInstance: T) => T;
export declare namespace InstanceRegistrationInjection {
    function inject(RegistrationRootStoreFunction: InstanceRegistrationAction): void;
    function getInstanceRegistrationAction(): InstanceRegistrationAction;
}
