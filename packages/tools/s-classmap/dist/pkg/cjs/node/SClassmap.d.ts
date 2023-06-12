import type { ISClassmapBaseSettings } from '../shared/SClassmapBase';
import __SClassmapBase from '../shared/SClassmapBase';

export interface ISClassmapSettings extends ISClassmapBaseSettings {
    path: string;
}
export default class SClassmap extends __SClassmapBase {
    
    map: {};
    
    constructor(settings?: Partial<ISClassmapSettings>);
    
    readSync(): any;
    
    saveSync(incremental?: boolean): void;
    
    applyOnAst(node: any, map?: {}): {};
}
