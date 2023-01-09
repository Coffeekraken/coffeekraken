import __SClass from '@coffeekraken/s-class';
import type { ISConfigSettings } from '@coffeekraken/s-config';
import __SConfig from '@coffeekraken/s-config';

export interface ISSugarConfigLoadedObj {
    id: string;
    config: any;
    instance: SSugarConfig;
}
export interface ISugarConfigToDocblocksResult {
    path: string;
    docblocks: any[];
}
export interface ISSugarConfigSettings {
    id: string;
    env: 'development' | 'production' | 'test';
    platform: 'node' | 'browser';
    cache: boolean;
    clean: boolean;
}
export default class SSugarConfig extends __SClass {
    static _sSugarConfigInstances: Record<string, __SConfig>;
    static _sugarJson: any;
    static _rootSugarJson: any;
    static _registeredConfigFolderPaths: any[];
    static _registeredConfigFilesPaths: any[];
    
    static registerFolder(path: string, scope?: 'default' | 'module' | 'repo' | 'package' | 'user', packageName?: string): void;
    
    static get filesRealPaths(): string[];
    
    static get filesPaths(): string[];
    
    static get foldersRealPaths(): string[];
    
    static get foldersPaths(): string[];
    
    static _loadPromises: {};
    static load(settings?: Partial<ISSugarConfigSettings>): ISSugarConfigLoadedObj;
    
    static toJson(settings?: Partial<ISSugarConfigSettings>): any;
    
    static toObject(settings?: Partial<ISSugarConfigSettings>): any;
    
    static isLoaded(id?: string): boolean;
    
    static toDocblocks(configIdOrPath: string): any[];
    
    static hash(dotPath?: string): string;
    
    static get(dotPath: string, id?: string): any;
    
    static getSafe(dotPath: string, id?: string): any;
    
    static set(dotPath: string, value: any, id?: string): any;
    static _searchConfigFiles(): Promise<void>;
    
    private _configInstance;
    
    constructor(settings?: Partial<ISSugarConfigSettings>);
    
    hash(dotPath?: string): string;
    
    get(dotpath: string, settings?: Partial<ISConfigSettings>): any;
    
    set(dotpath: string, value: any): any;
    
    toDocblocks(configId: string): any[];
    
    toJson(): any[];
    
    toObject(): any[];
    
    cache(): any[];
    
    _load(settings: ISSugarConfigSettings): Promise<any>;
}
