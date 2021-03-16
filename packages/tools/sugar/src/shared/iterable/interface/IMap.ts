export interface IMapFnSettings {
  newStack?: boolean;
}

export interface IMapCallbackFn {
  (key: any, value: any, index: number): any;
}

export default interface IMapFn {
  (
    stack: Iterable<any>,
    callback: IMapCallbackFn,
    settings?: IMapFnSettings
  ): Promise<Iterable<any>>;
}
