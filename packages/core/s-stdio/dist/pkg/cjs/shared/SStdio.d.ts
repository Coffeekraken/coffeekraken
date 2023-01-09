import type { ISClass } from '@coffeekraken/s-class';
import __SClass from '@coffeekraken/s-class';
import type { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import type { ISPromise } from '@coffeekraken/s-promise';
export interface ISStdioSettings {
    filter: typeof Function;
    processor: typeof Function;
    defaultLogObj: Partial<ISLog>;
    defaultAskObj: Partial<ISLogAsk>;
}
export interface ISStdioCtor {
    new (sources: ISPromise | ISPromise[], settings: Partial<ISStdioSettings>): ISStdio;
}
export interface ISStdioRegisteredComponents {
    [key: string]: ISStdioComponent;
}
export interface ISStdioComponent {
    id: string;
    render(logObj: ISLog, settings: any): any;
}
export type ISStdioUi = -1 | 'websocket';
export interface ISStdioLogFn {
    (...logObj: ISLog[]): void;
}
export interface ISStdio extends ISClass {
    sources: ISEventEmitter[];
    log: ISStdioLogFn;
}

export default class SStdio extends __SClass implements ISStdio {
    
    sources: ISEventEmitter[];
    
    static _instanciatedStdio: {};
    
    static registeredComponents: ISStdioRegisteredComponents;
    
    _lastLogObj?: ISLog;
    
    static UI_BASIC: ISStdioUi;
    
    _logsBuffer: ISLog[];
    
    private _isDisplayed;
    
    static registerComponent(component: ISStdioComponent, settings?: any, as?: string): void;
    
    static existingOrNew(id: string, sources: any, stdio?: ISStdioUi, settings?: {}): any;
    
    static new(id: string, sources: any, stdio: ISStdioUi, settings?: {}): any;
    
    _id: string;
    get id(): string;
    
    constructor(id: string, sources: ISEventEmitter | ISEventEmitter[], settings?: Partial<ISStdioSettings>);
    
    _logBuffer(): void;
    
    display(): void;
    
    hide(): void;
    
    _tmpPrintedLogs: string[];
    registerSource(source: any, settings?: Partial<ISStdioSettings>): void;
    
    _isClearing: boolean;
    _hashBuffer: string[];
    log(...logObj: ISLog[]): void;
    
    ask(askObj: Partial<ISLogAsk>): Promise<any>;
    
    isDisplayed(): boolean;
}
