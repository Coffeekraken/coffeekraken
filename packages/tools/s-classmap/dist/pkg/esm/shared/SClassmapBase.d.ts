import __SClass from '@coffeekraken/s-class';

export interface ISClassmapSettings {
    map: string | Record<string, string>;
}
export default class SClassmapBase extends __SClass {
    
    map: any;
    
    constructor(settings?: Partial<ISClassmapSettings>);
    
    patchHtml(html: string): string;
}
