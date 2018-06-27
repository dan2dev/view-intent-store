"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FetchInjection;
(function (FetchInjection) {
    var fetchAction = function (url) {
        console.warn("could not load the " + url + " because you didn't register the fetch action.");
    };
    function registerFetchAction(action) {
        fetchAction = action;
    }
    FetchInjection.registerFetchAction = registerFetchAction;
    function getFetchAction() {
        return fetchAction;
    }
    FetchInjection.getFetchAction = getFetchAction;
})(FetchInjection = exports.FetchInjection || (exports.FetchInjection = {}));
//# sourceMappingURL=fetch-injection.js.map