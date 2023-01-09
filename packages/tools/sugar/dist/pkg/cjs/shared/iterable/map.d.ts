
export interface IMapFnSettings {
    newStack?: boolean;
}
export interface IMapCallbackObj {
    key: any;
    prop: any;
    value: any;
    i: number;
    idx: number;
}
export interface IMapCallbackFn {
    (metas: IMapCallbackObj): any;
}
export interface IMapFn {
    (stack: Iterable<any>, callback: IMapCallbackFn, settings?: IMapFnSettings): Promise<Iterable<any>>;
}
declare const fn: IMapFn;
export default fn;
