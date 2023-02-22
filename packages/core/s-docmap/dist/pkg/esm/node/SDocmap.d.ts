import __SClass from '@coffeekraken/s-class';

export interface ISDocmapBuildParams {
    watch: boolean;
    globs: string[];
    exclude: string[];
    excludeByTags: Record<string, RegExp[]>;
    tags: string[];
    save: boolean;
    outPath: string;
}
export interface ISDocmapReadParams {
    input: string;
    sort: string[];
    sortDeep: string[];
}
export interface ISDocmapTagProxyFn {
    (data: any): any;
}
export interface ISDocmapCustomMenuSettingFn {
    (menuItem: ISDocmapMenuObjItem): boolean;
}
export interface ISDocmapSettings {
    customMenu: Record<string, ISDocmapCustomMenuSettingFn>;
    tagsProxy: Record<string, ISDocmapTagProxyFn>;
}
export interface ISDocmapEntry {
    path?: string;
    name?: string;
    namespace?: string;
    filename?: string;
    extension?: string;
    relPath?: string;
    directory?: string;
    relDirectory?: string;
    type?: string;
    description?: string;
    extends?: boolean;
    static?: boolean;
    since?: string;
    status?: string;
    package?: any;
    menu?: any;
}
export interface ISDocmapEntries {
    [key: string]: ISDocmapEntry;
}
export interface ISDocmapMenuObjItem {
    name: any;
    slug: any;
    [key: string]: Partial<ISDocmapMenuObjItem>;
}
export interface ISDocmapMenuObj {
    packages: Record<string, Partial<ISDocmapMenuObjItem>>;
    tree: Record<string, Partial<ISDocmapMenuObjItem>>;
    slug: Record<string, Partial<ISDocmapMenuObjItem>>;
    custom: Record<string, Partial<ISDocmapMenuObjItem>>;
}
export interface ISDocmapSearchParams {
    slug: string;
    namespace: string;
}
export interface ISDocmapSearchResult {
    search: Partial<ISDocmapSearchParams>;
    items: ISDocmapEntries;
}
export interface ISDocmapObj {
    map: ISDocmapEntries;
    menu: Partial<ISDocmapMenuObj>;
}
export interface ISDocmap {
    _entries: ISDocmapEntries;
}
declare class SDocmap extends __SClass implements ISDocmap {
    static _cachedDocmapJson: {};
    static _registeredTagsProxy: {};
    
    static registerTagProxy(tag: string, processor: ISDocmapTagProxyFn): any;
    
    _entries: ISDocmapEntries;
    
    _docmapJson: any;
    
    constructor(settings?: Partial<ISDocmapSettings>);
    
    read(params?: Partial<ISDocmapReadParams>): Promise<ISDocmapObj>;
    
    search(params?: Partial<ISDocmapSearchParams>): Promise<ISDocmapSearchResult>;
    
    _extractMenu(docmapJson?: Partial<ISDocmapObj>): ISDocmapMenuObj;
    _extractMenuFromDocmapJsonStack(docmapJsonMap: any): {
        tree: {};
        slug: {};
    };
    
    build(params: Partial<ISDocmapBuildParams>): Promise<any>;
}
export default SDocmap;
