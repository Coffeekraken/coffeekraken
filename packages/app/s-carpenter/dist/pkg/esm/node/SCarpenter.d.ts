import __SClass from '@coffeekraken/s-class';

export interface ISCarpenterStartParams {
    port: number;
}
export interface ISCarpenterSettingsSource {
    title: string;
    inDir: string;
    glob: string;
}
export interface ISCarpenterSettingsSources {
    [key: string]: Partial<ISCarpenterSettingsSource>;
}
export interface ISCarpenterSettings {
    sources: ISCarpenterSettingsSources;
}
declare class SCarpenter extends __SClass {
    
    constructor(settings?: Partial<ISCarpenterSettings>);
    
    loadSpecs(settings?: Partial<ISCarpenterSettings>): Promise<any>;
    
    start(params: Partial<ISCarpenterStartParams>): Promise<any>;
}
export default SCarpenter;
