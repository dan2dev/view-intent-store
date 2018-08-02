export type InstanceRegistrationAction = <T>(stateName: string, stateRootInstance: T) => T;
export namespace InstanceRegistrationInjection {
  let RegistrationRootStore: InstanceRegistrationAction = <T>(stateName: string, stateRootInstance: T) => {
    console.error("You didn't inject the 'RegistrationRootStore' function.");
    return stateRootInstance;
  };
  export function inject(RegistrationRootStoreFunction: InstanceRegistrationAction) {
    RegistrationRootStore = RegistrationRootStoreFunction;
  }
  export function getInstanceRegistrationAction(): InstanceRegistrationAction {
    return RegistrationRootStore;
  }
  
}
