import { win } from "window-var";
// start global vars ------------
if (win.vis === undefined) {
    win.vis = {};
}
win.vis.registrationRootStore = function (stateName, stateRootInstance) {
    console.error("You didn't inject the 'RegistrationRootStore' function.");
    return stateRootInstance;
};
export var InstanceRegistrationInjection;
(function (InstanceRegistrationInjection) {
    // let RegistrationRootStore: InstanceRegistrationAction = <T>(stateName: string, stateRootInstance: T) => {
    //   console.error("You didn't inject the 'RegistrationRootStore' function.");
    //   return stateRootInstance;
    // };
    function inject(RegistrationRootStoreFunction) {
        win.vis.registrationRootStore = RegistrationRootStoreFunction;
    }
    InstanceRegistrationInjection.inject = inject;
    function getInstanceRegistrationAction() {
        return win.vis.registrationRootStore;
    }
    InstanceRegistrationInjection.getInstanceRegistrationAction = getInstanceRegistrationAction;
})(InstanceRegistrationInjection || (InstanceRegistrationInjection = {}));
//# sourceMappingURL=instance-registration-injection.js.map