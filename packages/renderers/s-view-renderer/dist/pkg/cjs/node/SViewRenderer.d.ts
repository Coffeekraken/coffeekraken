import __SClass from '@coffeekraken/s-class';
import type { ISDurationObject } from '@coffeekraken/s-duration';
import type { ISFileObject } from '@coffeekraken/s-file';
import type { ISPromise } from '@coffeekraken/s-promise';

export interface ISViewRendererSettings {
    rootDirs: string[];
    cacheDir: string;
    defaultEngine: 'twig' | 'blade';
    enginesSettings?: any;
    sharedData?: any;
    sharedDataFiles?: string[];
    sharedJsonDataFiles?: string[];
}
export interface ISViewViewMetas extends ISFileObject {
}
export interface ISViewRendererEngines {
    [key: string]: ISViewRendererEngine;
}
export interface ISViewRendererDataHandler {
    (filePath: string): ISPromise;
}
export interface ISViewRendererDataHandlers {
    [key: string]: ISViewRendererDataHandler;
}
export interface ISViewRendererEngine {
}
export interface ISViewRendererRenderResult extends ISDurationObject {
    view: ISViewViewMetas;
    value?: string;
    error?: string;
}
export interface ISViewRenderer {
    _viewPath?: string;
    _viewString?: string;
}
declare class SViewRenderer extends __SClass implements ISViewRenderer {
    
    static engines: {};
    
    static get defaultRootDirs(): string[];
    
    static getRootDirs(rootDirs?: any[]): string[];
    
    static render(viewPath: string, data: any, settings: Partial<ISViewRendererSettings>): Promise<unknown>;
    
    static registerEngine(EngineClass: string, extensions?: string | string[]): void;
    
    private _sharedDataFilePath;
    
    private _sharedData;
    
    constructor(settings?: ISViewRendererSettings);
    _loaded: boolean;
    _load(): Promise<void>;
    
    _getRendererEngineClassFromFinalViewPath(finalViewPath: string): any;
    
    _getRendererEngineClassFromEngineId(engineId: string): any;
    _getFinalViewPath(viewDotPath: string): string;
    
    _needLoad: boolean;
    _loadSharedData(): Promise<void>;
    
    render(viewDotPath: string, data?: string | Promise<any> | any, settings?: Partial<ISViewRendererSettings>): Promise<ISViewRendererRenderResult>;
}
export default SViewRenderer;
