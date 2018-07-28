export var InstanceRegistrationInjection;
(function (InstanceRegistrationInjection) {
    var RegistrationRootStore = function (stateName, stateRootInstance) {
        console.error("You didn't inject the 'RegistrationRootStore' function.");
        return stateRootInstance;
    };
    function inject(RegistrationRootStoreFunction) {
        RegistrationRootStore = RegistrationRootStoreFunction;
    }
    InstanceRegistrationInjection.inject = inject;
    function getInstanceRegistrationAction() {
        return RegistrationRootStore;
    }
    InstanceRegistrationInjection.getInstanceRegistrationAction = getInstanceRegistrationAction;
})(InstanceRegistrationInjection || (InstanceRegistrationInjection = {}));
//# sourceMappingURL=instance-registration-injection.js.map