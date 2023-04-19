import __SClass from '@coffeekraken/s-class';

export interface ISFrontspecSourceConfigObj {
    config: String;
}
export interface ISFrontspecSourceObjectObj {
    value: any;
}
export interface ISFrontspecSourceObj {
    type: 'config' | 'object';
    process?: Function;
    [key: string]: ISFrontspecSourceConfigObj | ISFrontspecSourceObjectObj;
}
export interface ISFrontspecBuildParams {
    sources: Record<string, ISFrontspecSourceObj>;
}
export interface ISFrontspecAddParams {
}
export interface ISFrontspecAssetToServe {
}
export default class SFrontspec extends __SClass {
    static _cachesStack: {};
    static _defaultFrontspecInstance: any;
    _frontspec: any;
    
    static get(dotpath?: string): any;
    
    constructor(settings?: {});
    
    get(dotpath?: string): any;
    
    read(): any;
    
    build(params: Partial<ISFrontspecBuildParams>): Promise<any>;
    
    assetsToServe(): Promise<ISFrontspecAssetToServe[]>;
}
