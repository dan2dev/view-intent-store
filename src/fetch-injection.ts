import {win} from "window-var";
// start global vars ------------
if ((win as any).vis === undefined) {
  (win as any).vis = {};
}
((win as any).vis as any).fetchAction = (url: string) => {
  console.warn(`could not load the ${url} because you didn't register the fetch action.`);
};
// end global ----------------
export type FetchAction = (url: string) => void;
export namespace FetchInjection {
  export interface IFetchCallback {
    onSuccess: (url: string) => void;
    onError: (url: string) => void;
  }
  // let fetchAction: FetchAction = (url: string) => {
  //   console.warn(`could not load the ${url} because you didn't register the fetch action.`);
  // };
  export function inject(action: FetchAction) {
    ((win as any).vis as any).fetchAction = action;
  }
  export function getFetchAction(): FetchAction {
    return ((win as any).vis as any).fetchAction;
  }
}
