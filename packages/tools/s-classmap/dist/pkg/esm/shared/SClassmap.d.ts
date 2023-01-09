import __SClass from '@coffeekraken/s-class';

export interface ISClassmapSettings {
    map: Record<string, string>;
}
export default class SClassmap extends __SClass {
    
    map: {};
    
    constructor(map: Record<string, string> | string, settings?: Partial<ISClassmapSettings>);
    
    loadFromUrl(url: string): Promise<Record<string, string>>;
    
    read(): Promise<any>;
}
