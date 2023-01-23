import __SClass from '@coffeekraken/s-class';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import type { ISStdioAdapter } from './SStdioAdapter';
import type { ISStdioSource } from './SStdioSource';
export interface ISStdioSettings {
    filter: typeof Function;
    processor: typeof Function;
    defaultLogObj: Partial<ISLog>;
    defaultAskObj: Partial<ISLogAsk>;
}
export interface ISStdioLogFn {
    (...logObj: ISLog[]): void;
}
export default class SStdio extends __SClass {
    
    sources: ISStdioSource[];
    
    adapters: ISStdioAdapter[];
    
    static _instanciatedStdio: {};
    
    _lastLogObj?: ISLog;
    
    _logsBuffer: ISLog[];
    
    private _isDisplayed;
    
    static existingOrNew(id: string, sources: ISStdioSource[], adapters: ISStdioAdapter[], settings?: {}): any;
    
    static new(id: string, sources: ISStdioSource[], adapters: ISStdioAdapter, settings?: Partial<ISStdioSettings>): any;
    
    _id: string;
    get id(): string;
    
    constructor(id: string, sources: ISStdioSource[], adapters: ISStdioAdapter[], settings?: Partial<ISStdioSettings>);
    
    _logBuffer(): void;
    
    display(): void;
    
    hide(): void;
    
    registerSource(source: ISStdioSource): void;
    
    _applyOnAdapters(callback: Function): void;
    
    _isClearing: boolean;
    log(...logObj: ISLog[]): void;
    
    ask(askObj: Partial<ISLogAsk>): Promise<any>;
    
    isDisplayed(): boolean;
}
