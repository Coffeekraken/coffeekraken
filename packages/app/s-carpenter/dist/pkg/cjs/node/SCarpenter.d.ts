import __SClass from '@coffeekraken/s-class';

export interface ISCarpenterStartParams {
    port: number;
    vitePort: number;
    dev: boolean;
    env: 'development' | 'production';
}
export interface ISCarpenterSettings {
    namespaces: string[];
}
declare class SCarpenter extends __SClass {
    
    constructor(settings?: Partial<ISCarpenterSettings>);
    
    loadSpecs(settings?: Partial<ISCarpenterSettings>): Promise<any>;
    
    start(params: Partial<ISCarpenterStartParams>): Promise<any>;
    
    initOnExpressServer(expressServer: any): Promise<void>;
}
export default SCarpenter;
