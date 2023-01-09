import __SClass from '@coffeekraken/s-class';

export interface ISDocblockBlockTagsMap {
    [key: string]: Function;
}
export interface ISDocblockBlockSettings {
    filePath?: string;
    packageJson: any;
    renderMarkdown: boolean;
    markedOptions: any;
    tags: ISDocblockBlockTagsMap;
}
declare class SDocblockBlock extends __SClass {
    
    static tagsMap: ISDocblockBlockTagsMap;
    
    _source: string;
    
    _blockObj: any;
    
    static registerTag(tagName: string, parser: any): void;
    
    constructor(source: any, settings?: Partial<ISDocblockBlockSettings>);
    
    toString(): string;
    
    toObject(): any;
    
    parse(): Promise<any>;
}
export default SDocblockBlock;
