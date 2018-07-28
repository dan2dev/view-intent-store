export declare type FetchAction = (url: string) => void;
export declare namespace FetchInjection {
    interface IFetchCallback {
        onSuccess: (url: string) => void;
        onError: (url: string) => void;
    }
    function inject(action: FetchAction): void;
    function getFetchAction(): FetchAction;
}
