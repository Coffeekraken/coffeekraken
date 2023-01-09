import type { ISClass } from '@coffeekraken/s-class';
import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';

export interface ISBuilderLogSettings {
    verbose: boolean;
}
export interface ISBuilderSettings {
    interface: typeof __SInterface;
    log: Partial<ISBuilderLogSettings>;
}
export interface ISBuilder extends ISClass {
    build(params: any, settings?: any): any;
}
declare class SBuilder extends __SClass implements ISBuilder {
    
    constructor(settings: Partial<ISBuilderSettings>);
    
    build(params?: any, settings?: any): any;
}
export default SBuilder;
