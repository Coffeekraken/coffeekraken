import __SClass from '@coffeekraken/s-class';
import type { ISDocblockBlock } from './SDocblockBlock';

export interface ISDocblockSortFnSetting {
    (a: any, b: any): any;
}
export interface ISDocblockSettings {
    filePath?: string;
    filter?: Function;
    filterByTag: Record<string, any>;
    renderMarkdown: boolean;
    markedOptions: any;
    sortFunction?: ISDocblockSortFnSetting;
}
export interface ISDocblock {
    _source: string;
    blocks: ISDocblockBlock[];
    toObject(): any;
}
declare class SDocblock extends __SClass implements ISDocblock {
    
    _source: string;
    
    _packageJson: any;
    
    _blocks: any[];
    
    constructor(source: string, settings?: Partial<ISDocblockSettings>);
    
    sort(sortFunction?: ISDocblockSortFnSetting): this;
    
    get blocks(): any[];
    
    _parsed: boolean;
    parse(string?: string): Promise<ISDocblockBlock[]>;
    
    toObject(): any[];
    
    toString(): string;
}
export default SDocblock;
