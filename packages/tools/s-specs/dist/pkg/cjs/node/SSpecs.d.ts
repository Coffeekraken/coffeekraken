import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';

export interface ISSpecsSettings {
    namespaces: Record<string, string[]>;
    read: Partial<ISSpecsReadSettings>;
}
export interface ISSpecsReadSettings {
}
export interface ISSpecsListResult {
    name: string;
    filename: string;
    dotpath: string;
    namespace: string;
    path: string;
    dir: string;
    read: Function;
}
export default class SSpecs extends __SClass {
    
    static fromInterface(int: __SInterface, settings?: Partial<ISSpecsSettings>): any;
    static extractDefaults(specs: any): any;
    
    constructor(settings?: Partial<ISSpecsSettings>);
    
    read(specDotPath: string, settings?: Partial<ISSpecsReadSettings>): any;
    
    list(namespaces?: any[]): ISSpecsListResult[];
    
    resolve(value: any, specJson: any): any;
}
