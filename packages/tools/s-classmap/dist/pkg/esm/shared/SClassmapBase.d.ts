import __SClass from '@coffeekraken/s-class';

export interface ISClassmapBaseSettings {
    map: string | Record<string, string>;
}
export default class SClassmapBase extends __SClass {
    
    map: any;
    
    constructor(settings?: Partial<ISClassmapBaseSettings>);
    
    
    patchHtml(html: string): string;
}
