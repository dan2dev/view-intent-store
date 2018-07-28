export var FetchInjection;
(function (FetchInjection) {
    var fetchAction = function (url) {
        console.warn("could not load the " + url + " because you didn't register the fetch action.");
    };
    function inject(action) {
        fetchAction = action;
    }
    FetchInjection.inject = inject;
    function getFetchAction() {
        return fetchAction;
    }
    FetchInjection.getFetchAction = getFetchAction;
})(FetchInjection || (FetchInjection = {}));
//# sourceMappingURL=fetch-injection.js.map