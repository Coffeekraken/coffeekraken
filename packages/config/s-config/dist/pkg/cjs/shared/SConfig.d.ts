import __SConfigAdapter from '@coffeekraken/s-config-adapter';

export interface ISConfigPostprocessFn {
    (currentConfig: any, config: any): any;
}
export interface ISConfigPreprocessFn {
    (currentRawConfig: any, rawConfig: any): any;
}
export interface ISConfigAfterLoadFn {
    (dotPath: string, originalValue: any, config: any): any;
}
export interface ISConfigResolverFn {
    (): any;
}
export interface ISConfigResolverObj {
    match: RegExp;
    resolve: ISConfigResolverFn;
}
export interface ISConfigEnvObj {
    platform: 'node' | 'browser';
    env: 'production' | 'development' | 'test';
}
export interface ISConfigLoadSettings {
    isUpdate: boolean;
    clean: boolean;
}
export interface ISConfigSettings {
    env: ISConfigEnvObj;
    cache: boolean;
    updateTimeout: number;
    loadTimeout: number;
    throwErrorOnUndefinedConfig: boolean;
}
export default class SConfig {
    
    _name: any;
    
    adapter: any;
    
    settings: {};
    
    config: any;
    
    integrity: string;
    
    static _registeredPostprocess: any;
    static registerPostprocess(configId: string, configKey: string, postprocessFn: ISConfigPostprocessFn): void;
    
    static _registeredPreprocesses: any;
    static registerPreprocess(configId: string, configKey: string, preprocessFn: ISConfigPreprocessFn): void;
    
    constructor(name: any, adapter: __SConfigAdapter, settings?: ISConfigSettings);
    
    load(settings?: Partial<ISConfigLoadSettings>): Promise<any>;
    
    fromCache(): any;
    
    cache(): any;
    
    get(path: string, settings?: Partial<ISConfigSettings>): any;
    
    set(path: string, value: any, settings?: {}): any;
    
    toObject(): any;
    
    toJson(): any;
}
