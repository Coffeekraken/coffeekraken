import __SClass from '@coffeekraken/s-class';
import type { ISDurationObject } from '@coffeekraken/s-duration';
import { TWhenTrigger } from '@coffeekraken/sugar/dom';

export interface ISConductorSettings {
    idleTimeout: number;
    logTimeout: number;
    log: boolean;
}
export type TSConductorTrigger = TWhenTrigger | 'idle';
export interface ISConductorTaskObj extends ISDurationObject {
    id: string;
    registerTime: number;
    triggers: TSConductorTrigger[];
    $elm: HTMLElement;
    task: Function;
    watchers: Function[];
    resolve: Function;
}
export default class SConductor extends __SClass {
    
    static _defaultInstance: SConductor;
    
    static _defaultInstanceSettings: Partial<ISConductorSettings>;
    
    static get defaultInstance(): SConductor;
    
    static when($elm?: HTMLElement, trigger: TSConductorTrigger[], task?: Function): Promise<ISConductorTaskObj>;
    
    static setup(settings: Partial<ISConductorSettings>): void;
    
    _tasksStack: Record<string, ISConductorTaskObj>;
    
    _runningTasksStack: Record<string, ISConductorTaskObj>;
    
    _logTimeout: number;
    
    _idleInterval: number;
    
    _startTime: number;
    
    constructor(settings?: Partial<ISConductorSettings>);
    
    _checkIdle(): void;
    
    _executeTask(taskObj: ISConductorTaskObj): ISConductorTaskObj;
    
    _elementNeeded($elm: any, time: TSConductorTrigger): void;
    
    when($elm?: HTMLElement, trigger: TSConductorTrigger[], task?: Function): Promise<ISConductorTaskObj>;
}
