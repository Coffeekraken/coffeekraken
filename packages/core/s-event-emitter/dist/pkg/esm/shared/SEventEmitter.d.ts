import type { ISClass } from '@coffeekraken/s-class';
import SClass from '@coffeekraken/s-class';

export type Instantiable<T = any> = new (...args: any[]) => T;
export interface ISEventEmitterPipeSettingsProcessorFn {
    (value: any, metas: ISEventEmitterMetas): any;
}
export interface ISEventEmitterPipeSettingsFilterFn {
    (value: any, metas: ISEventEmitterMetas): boolean;
}
export interface ISEventEmitterPipeSettings {
    events?: string;
    prefixEvent?: boolean;
    prefixValue?: string;
    stripAnsi?: boolean;
    trim?: boolean;
    overrideEmitter?: boolean | 'bind';
    keepLineBreak?: boolean;
    processor?: ISEventEmitterPipeSettingsProcessorFn;
    exclude?: string[];
    filter?: ISEventEmitterPipeSettingsFilterFn;
}
export interface ISEventEmitterOnSettings {
    processor: ISEventEmitterPipeSettingsProcessorFn;
    filter: ISEventEmitterPipeSettingsFilterFn;
    id: string;
}
export interface ISEventEmitterCallbackSettings {
    callNumber?: number;
    filter?: ISEventEmitterPipeSettingsFilterFn;
    processor?: ISEventEmitterPipeSettingsProcessorFn;
    id?: string;
}
export interface ISEventEmitterMetas {
    event: string;
    id?: string;
    name?: string;
    color?: string;
    emitter?: any;
    originalEmitter?: any;
    time?: number;
    level?: number;
    askId?: string;
}
export interface ISEventEmitterCallbackFn {
    (value: any, metas: ISEventEmitterMetas, answer?: Function): any;
}
export interface ISEventEmitterEventStackItem {
    callback: ISEventEmitterCallbackFn;
    callNumber: number;
    called: number;
    filter: ISEventEmitterPipeSettingsFilterFn;
    processor: ISEventEmitterPipeSettingsProcessorFn;
}
export interface ISEventEmitterEventsStacks {
    [key: string]: ISEventEmitterEventStackItem;
}
export interface ISEventEmitterEventObj {
    event: string;
    value: any;
    metas: ISEventEmitterMetas;
    resolve: Function;
    reject: Function;
}
export interface ISEventEmitterInstanceSettings {
    eventEmitter: ISEventEmitterSettings;
}
export interface ISEventEmitterSettings {
    bufferTimeout: number;
    asyncStart: boolean;
    defaults: Record<string, any>;
    castByEvent: Record<string, Function | Instantiable>;
    bind: any;
}
export interface ISEventEmitterCtor {
}
export interface ISEventEmitter extends ISClass {
    settings: ISEventEmitterInstanceSettings;
    _buffer: ISEventEmitterEventObj[];
    _eventsStacks: ISEventEmitterEventsStacks;
    settings: ISEventEmitterSettings;
    on(stack: string, callback: ISEventEmitterCallbackFn): ISEventEmitter;
    emit(stack: string, value: any, metas?: ISEventEmitterMetas): ISEventEmitter;
}
declare class SEventEmitter extends SClass implements ISEventEmitter {
    static usableAsMixin: boolean;
    static _ipcInstance: any;
    
    static _globalInstance: any;
    static get global(): SEventEmitter;
    
    static pipe(sourceSEventEmitter: ISEventEmitter, destSEventEmitter: ISEventEmitter | any, settings?: ISEventEmitterPipeSettings): ISEventEmitter;
    
    private _asyncStarted;
    
    _buffer: ISEventEmitterEventObj[];
    
    _eventsStacks: any;
    
    _onStackById: any;
    settings: ISEventEmitterSettings;
    
    constructor(settings?: Partial<ISEventEmitterSettings>);
    
    bind(obj: any): this;
    
    pipe(input: ISEventEmitter, settings?: ISEventEmitterPipeSettings): ISEventEmitter;
    
    pipeErrors(input: ISEventEmitter, settings?: ISEventEmitterPipeSettings): ISEventEmitter;
    
    pipeFrom(input: ISEventEmitter, settings?: ISEventEmitterPipeSettings): ISEventEmitter;
    
    pipeTo(dest: ISEventEmitter, settings?: ISEventEmitterPipeSettings): this;
    
    start(): void;
    
    _createMetas(event: string, metas?: Partial<ISEventEmitterMetas>): ISEventEmitterMetas;
    emit(event: string, value: any, metas?: Partial<ISEventEmitterMetas>): any;
    _emit(logObj: ISEventEmitterEventObj): Promise<void>;
    
    _registerNewEventsStacks(events: any): void;
    
    _registerCallbackInEventStack(event: string, callback: ISEventEmitterCallbackFn, settings?: ISEventEmitterCallbackSettings): this;
    
    _processBuffer(): void;
    
    _emitEventStack(event: string, initialValue: any, metasObj: ISEventEmitterMetas): Promise<any>;
    
    _emitEvents(events: string | string[], initialValue: any, metas: ISEventEmitterMetas): any;
    
    on(events: string | string[], callback: ISEventEmitterCallbackFn, settings?: Partial<ISEventEmitterOnSettings>): ISEventEmitter;
    
    off(event: string, callback?: ISEventEmitterCallbackFn): ISEventEmitter;
    
    destroy(): void;
}
export default SEventEmitter;
