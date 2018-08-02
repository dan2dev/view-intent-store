import { win } from "window-var";
// start global vars ------------
if (win.vis === undefined) {
    win.vis = {};
}
win.vis.fetchAction = function (url) {
    console.warn("could not load the " + url + " because you didn't register the fetch action.");
};
export var FetchInjection;
(function (FetchInjection) {
    // let fetchAction: FetchAction = (url: string) => {
    //   console.warn(`could not load the ${url} because you didn't register the fetch action.`);
    // };
    function inject(action) {
        win.vis.fetchAction = action;
    }
    FetchInjection.inject = inject;
    function getFetchAction() {
        return win.vis.fetchAction;
    }
    FetchInjection.getFetchAction = getFetchAction;
})(FetchInjection || (FetchInjection = {}));
//# sourceMappingURL=fetch-injection.js.map