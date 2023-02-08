import __SClass from '@coffeekraken/s-class';

export interface ISDocmapBuildParams {
    watch: boolean;
    globs: string[];
    exclude: string[];
    noExtends: boolean;
    excludePackages: string[];
    excludeByTags: Record<string, RegExp[]>;
    tags: string[];
    save: boolean;
    outPath: string;
}
export interface ISDocmapSnapshotParams {
    outDir: string;
}
export interface ISDocmapInstallSnapshotsParams {
    glob: string;
}
export interface ISDocmapReadParams {
    input: string;
    sort: string[];
    sortDeep: string[];
    excludePackages: string[];
    snapshot: string;
    snapshotDir: string;
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
    noExtends: boolean;
    excludePackages: string[];
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
export interface ISDocmapMetasObj {
    type: 'current' | 'snapshot' | undefined;
    snapshot?: string;
}
export interface ISDocmapSearchParams {
    slug: string;
    namespace: string;
    excludePackages: string[];
}
export interface ISDocmapSearchResult {
    search: Partial<ISDocmapSearchParams>;
    items: ISDocmapEntries;
}
export interface ISDocmapObj {
    metas: ISDocmapMetasObj;
    map: ISDocmapEntries;
    menu: Partial<ISDocmapMenuObj>;
    snapshots: string[];
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
    
    _isPackageExtendsExcluded(packageName: string, excludePackages?: string[]): boolean;
    
    build(params: Partial<ISDocmapBuildParams>): Promise<any>;
    
    installSnapshot(params: Partial<ISDocmapInstallSnapshotsParams>): Promise<any | void>;
    
    snapshot(params: Partial<ISDocmapSnapshotParams>): Promise<any>;
}
export default SDocmap;
