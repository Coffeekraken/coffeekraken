import type { ISConfigEnvObj } from '@coffeekraken/s-config';

export interface ISConfigAdapterSettings {
    name: string;
    onUpdate: typeof Function;
}
export interface ISConfigAdapterLoadParams {
    clearCache: boolean;
    env: ISConfigEnvObj;
    config: any;
}
export interface ISConfigAdapterLoadFn {
    (params: ISConfigAdapterLoadParams): Promise<any>;
}
export interface ISConfigAdapter {
    load: ISConfigAdapterLoadFn;
}
export default class SConfigAdapter {
    
    settings: ISConfigAdapterSettings;
    
    get name(): string;
    
    constructor(settings: Partial<ISConfigAdapterSettings>);
    
    _updateTimeout: any;
    update(): void;
    
    load(params: ISConfigAdapterLoadParams): Promise<any>;
}
