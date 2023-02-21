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
    
    constructor(settings?: {});
    
    read(): any;
    
    build(params: Partial<ISFrontspecBuildParams>): Promise<any>;
    
    assetsToServe(): Promise<ISFrontspecAssetToServe[]>;
}
