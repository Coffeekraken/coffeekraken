import __SClass from '@coffeekraken/s-class';

export interface ISFrontendServerStartParams {
    port: number;
    hostname: string;
    listen: boolean;
    rootDir: string;
    viewsDir: string;
    pagesDir: string;
    logLevel: string;
    prod: boolean;
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
    
    start(params: Partial<ISFrontendServerStartParams> | string): Promise<void | any>;
    request(url: string): any;
    corsProxy(params: Partial<ISFrontendServerCorsProxyParams> | string): Promise<any>;
    
    _getHandlerFn(handlerNameOrPath: string): Promise<any>;
    
    _registerPagesRoutes(): Promise<unknown>;
    
    _pagesConfigsBySlug: {};
    _getPageConfigBySlug(slug: any): any;
    _registerPageConfig(pageConfig: ISFrontendServerPageConfig, pageFile?: any, configId?: string): Promise<void>;
}
