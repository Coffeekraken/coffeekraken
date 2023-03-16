import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __express from 'express';

export interface ISFrontendServerStartParams {
    port: number;
    hostname: string;
    listen: boolean;
    rootDir: string;
    viewsDir: string;
    pagesDir: string;
    logLevel: string;
    target: 'development' | 'production';
}
export interface ISFrontendServerModuleApi {
    express: __express;
    settings: any;
    config: any;
    startParams: ISFrontendServerStartParams;
}
export interface ISFrontendServerAddDefaultPagesParams {
    yes: boolean;
    pagesDir: string;
    viewsDir: string;
}
export interface ISFrontendServerCorsProxyParams {
    port: number;
    targetUrlHeaderName: string;
    limit: string;
}
export interface ISFrontendServerPageViewConfig {
    data?: string;
    path?: string;
}
export interface ISFrontendServerPageConfig {
    slugs?: string[];
    views?: ISFrontendServerPageViewConfig[];
    params?: any;
    handler?: string;
}
export interface ISFrontendServerMetas {
    hostname: string;
    port: number;
    sessionId: string;
}
export default class SFrontendServer extends __SClass {
    
    private _express;
    
    serverMetas: ISFrontendServerMetas;
    
    constructor();
    _config: any;
    
    start(params: Partial<ISFrontendServerStartParams> | string): Promise<any | Function>;
    request(url: string): __SPromise;
    corsProxy(params: Partial<ISFrontendServerCorsProxyParams> | string): Promise<any>;
    
    _getHandlerFn(handlerNameOrPath: string): Promise<any>;
    
    _registerPagesRoutes(): Promise<void>;
    
    _pagesConfigsBySlug: {};
    _getPageConfigBySlug(slug: any): any;
    _registerPageConfig(pageConfig: ISFrontendServerPageConfig | ISFrontendServerPageConfig[], pageFile?: any, configId?: string): Promise<void>;
}
