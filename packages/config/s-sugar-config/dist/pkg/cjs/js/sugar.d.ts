import type { ISSugarConfig } from '../shared/types';

export default class SSugarConfig {
    static _finalConfig: any;
    static get finalConfig(): ISSugarConfig;
    
    static get config(): ISSugarConfig;
    
    static get(dotpath?: string): any;
    
    static set(dotpath: string, value: any): any;
}
