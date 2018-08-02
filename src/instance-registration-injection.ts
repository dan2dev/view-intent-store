import {win} from "window-var";
// start global vars ------------
if ((win as any).vis === undefined) {
  (win as any).vis = {};
}
((win as any).vis as any).registrationRootStore = <T>(stateName: string, stateRootInstance: T) => {
  console.error("You didn't inject the 'RegistrationRootStore' function.");
  return stateRootInstance;
};
// end global ----------------

export type InstanceRegistrationAction = <T>(stateName: string, stateRootInstance: T) => T;
export namespace InstanceRegistrationInjection {
  // let RegistrationRootStore: InstanceRegistrationAction = <T>(stateName: string, stateRootInstance: T) => {
  //   console.error("You didn't inject the 'RegistrationRootStore' function.");
  //   return stateRootInstance;
  // };
  export function inject(RegistrationRootStoreFunction: InstanceRegistrationAction) {
    ((win as any).vis as any).registrationRootStore = RegistrationRootStoreFunction;
  }
  export function getInstanceRegistrationAction(): InstanceRegistrationAction {
    return ((win as any).vis as any).registrationRootStore;
  }
  
}
