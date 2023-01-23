import __SEventEmitter from '@coffeekraken/s-event-emitter';
import type { ISLog } from '@coffeekraken/s-log';
import { ISCommandProcessParams, ISCommandProcessSettings, ISProcessInternal, ISProcessParams, ISProcessProcessObj, ISProcessSettings } from './ISProcess';

declare class SProcess extends __SEventEmitter implements ISProcessInternal {
    
    _params?: Record<string, unknown>;
    get params(): Record<string, unknown>;
    
    stdio: any;
    
    _state: string;
    
    executionsStack: ISProcessProcessObj[];
    
    currentExecutionObj?: ISProcessProcessObj;
    
    paramsInterface: any;
    
    initialParams: Record<string, unknown>;
    
    _processPromise?: Promise;
    
    static from(what: string | Function | Promise<any> | SProcess, settings?: Partial<ISProcessSettings>): Promise<SProcess>;
    
    static fromCommand(initialParams?: Partial<ISCommandProcessParams>, settings?: Partial<ISCommandProcessSettings>): Promise<SProcess>;
    
    static run(paramsOrStringArgs?: string | Partial<ISProcessParams>, settings?: Partial<ISProcessSettings>): Promise<any>;
    
    constructor(initialParams?: Partial<ISProcessParams>, settings?: Partial<ISProcessSettings>);
    
    get lastExecutionObj(): ISProcessProcessObj | -1;
    
    
    ready(): void;
    
    _duration: any;
    run(paramsOrStringArgs?: string | Partial<ISProcessParams>, settings?: Partial<ISProcessSettings>): any;
    state(value?: string): string;
    
    kill(data: any): void;
    
    cancel(data: any): void;
    
    _onStateChange(state: any): void;
    
    isRunning(): boolean;
    
    isIdle(): boolean;
    
    isReady(): boolean;
    
    isKilled(): boolean;
    
    isError(): boolean;
    
    isSuccess(): boolean;
    
    log(...logs: ISLog[]): void;
    
    error(...errors: ISLog[]): void;
}
export default SProcess;
