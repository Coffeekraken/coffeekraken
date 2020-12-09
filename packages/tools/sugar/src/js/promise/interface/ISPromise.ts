// @ts-nocheck
// @shared

export interface ISPromiseSettings {
  id: string;
  destroyTimeout: number;
}

export interface ISPromiseMetas {
  stack: string;
  originalStack: string;
  id: string;
  state: 'pending' | 'resolved' | 'rejected' | 'canceled' | 'destroyed';
  time: number;
  level: number;
}

export interface ISPromiseFilterSettingFn {
  (value: any, metas: ISPromiseMetas): boolean;
}

export interface ISPromiseProcessorSettingFn {
  (value: any, metas: ISPromiseMetas): any;
}

export interface ISPromiseMapSettings {
  stacks: string;
  processor: ISPromiseProcessorSettingFn;
  filter: ISPromiseFilterSettingFn;
}

export interface ISPromiseStaticMapFn {
  (
    sourcesPromise: ISPromise | ISPromise[],
    destPromise: ISPromise,
    settings: ISPromiseMapSettings
  ): void;
}

export interface ISPromisePipeSettings {
  stacks: string;
  prefixStack: boolean;
  processor: ISPromiseProcessorSettingFn;
  filter: ISPromiseFilterSettingFn;
  exclude: string[];
}

export interface ISPromiseStaticPipeFn {
  (
    sourcesPromise: ISPromise | ISPromise[],
    destPromise: ISPromise,
    settings: ISPromiseMapSettings
  ): void;
}
export interface ISPromisePipeFn {
  (destPromise: ISPromise, settings: ISPromiseMapSettings): void;
}

export interface ISPromiseResolveRejectFn {
  (arg: any): void;
}

export interface ISPromiseTriggerFn {
  (what: string, value: any): void;
}

export interface ISPromiseCancelFn {
  (arg: any): void;
}
export interface ISPromiseExecutorFn {
  (
    resolve: ISPromiseResolveRejectFn,
    reject: ISPromiseResolveRejectFn,
    trigger: ISPromiseTriggerFn,
    cancel: ISPromiseCancelFn
  ): void;
}

export interface ISPromiseCtor {
  new (
    executorFnOrSettings: ISPromiseSettings | ISPromiseExecutorFn,
    settings?: ISPromiseSettings
  ): ISPromise;
  map: ISPromiseStaticMapFn;
  pipe: ISPromiseStaticPipeFn;
}

export interface ISPromiseOnCallbackFn {
  (value: any, metas: ISPromiseMetas): ISPromise;
}

export default interface ISPromise {
  _settings: ISPromiseSettings;
  _promiseState: 'pending' | 'resolved' | 'rejected' | 'canceled' | 'destroyed';
  readonly id: string;
  readonly promiseState: string;
  then(...args): any;
  is(
    status: 'pending' | 'resolved' | 'rejected' | 'canceled' | 'destroyed'
  ): boolean;
  isPending(): boolean;
  isResolved(): boolean;
  isRejected(): boolean;
  isCanceled(): boolean;
  isDestroyed(): boolean;
  pipe: ISPromisePipeFn;
  resolve(arg: any, stacksOrder: string): Promise<any>;
  reject(arg: any, stacksOrder: string): Promise<any>;
  cancel(arg: any, stacksOrder: string): Promise<any>;
  trigger(what: string, arg: any, metas?: ISPromiseMetas): Promise<any>;
  on(stacks: string | string[], callback: ISPromiseOnCallbackFn): ISPromise;
  off(stack: string, callback?: ISPromiseOnCallbackFn): ISPromise;
  catch(...args: any): ISPromise;
  finally(...args: any): ISPromise;
  resolved(...args: any): ISPromise;
  rejected(...args: any): ISPromise;
  canceled(...args: any): ISPromise;
}
