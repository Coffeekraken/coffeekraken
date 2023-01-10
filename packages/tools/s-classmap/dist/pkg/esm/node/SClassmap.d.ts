import type { ISClassmapSettings } from '../shared/SClassmapBase';
import __SClassmapBase from '../shared/SClassmap';

export interface ISClassmapNodeSettings extends ISClassmapSettings {
    path: string;
}
export default class SClassmap extends __SClassmapBase {
    
    constructor(settings?: Partial<ISClassmapNodeSettings>);
    
    read(): Promise<any>;
}
