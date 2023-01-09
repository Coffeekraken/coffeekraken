import __SClass from '@coffeekraken/s-class';

export interface ISFrontendCheckerSettings {
}
export interface ISFrontendCheckerCheckObj {
    id: string;
    name: string;
    description: string;
    level: number;
    check: Function;
}
export interface ISFrontendCheckerCheckResultObj {
    id: string;
    name: string;
    description: string;
    level: number;
    result: ISFrontendCheckerCheckResult;
}
export interface ISFrontendCheckerCheckResultAction {
    label: string;
    handler: Function;
}
export interface ISFrontendCheckerCheckResult {
    status: 'success' | 'warning' | 'error';
    message?: string;
    example?: string;
    action?: ISFrontendCheckerCheckResultAction;
    moreLink?: string;
}
export interface ISFrontendCheckerCheckFn {
    ($context: HTMLElement): Promise<ISFrontendCheckerCheckResult>;
}
export default class SFrontendCheckeer extends __SClass {
    
    static _registeredChecks: {
        [key: string]: ISFrontendCheckerCheckFn;
    };
    
    static LEVEL_LOW: number;
    
    static LEVEL_MEDIUM: number;
    
    static LEVEL_HIGH: number;
    
    static STATUS_SUCCESS: string;
    
    static STATUS_WARNING: string;
    
    static STATUS_ERROR: string;
    
    static registerCheck(checkObj: ISFrontendCheckerCheckObj): void;
    
    constructor(settings?: Partial<ISFrontendCheckerSettings>);
    
    check($context?: Document, checks?: string[]): any;
}
