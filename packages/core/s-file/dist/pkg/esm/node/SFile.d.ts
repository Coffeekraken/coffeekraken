import __SClass from '@coffeekraken/s-class';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';

export interface ISFileWatchSettings {
    pollingInterval: number;
}
export interface ISFileSettings {
    checkExistence: boolean;
    cwd: string;
    shrinkSizesTo: number;
    sourcesExtensions: string[];
    watch: boolean | Partial<ISFileWatchSettings>;
    writeSettings: ISFileWriteSettings;
    readSettings: ISFileReadSettings;
    processors: Record<string, Function[]>;
}
export interface ISFileReadSettings {
    encoding: 'utf8' | 'ascii' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex' | null;
    flag: string;
    cast: boolean;
}
export interface ISFileWriteSettings {
    encoding: 'utf8' | 'ascii' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex' | null | undefined;
    mode: number;
    flag: string;
    cast: boolean;
    path: string;
}
export interface ISFileObject {
    exists: string;
    cwd: string;
    path: string;
    relPath: string;
    name: string;
    extension: string;
    dirPath: string;
    stats: any;
    content: string;
}
export interface ISFileToObjectFn {
    (readContent: boolean): ISFileObject;
}
export interface ISFileUpdateFn {
    (): void;
}
export interface ISFileReadFn {
    (settings?: ISFileReadSettings): Promise<string>;
}
export interface ISFileReadSyncFn {
    (settings?: ISFileReadSettings): string;
}
export interface ISFileCommit {
    time: number;
    data: any;
}
export interface ISFileWriteFn {
    (data: string, settings?: ISFileWriteSettings): Promise<any>;
}
export interface ISFileWriteSyncFn {
    (data: string, settings?: ISFileWriteSettings): any;
}
export interface ISFileCtor {
    new (filepath: string, settings?: ISFileSettings): ISFile;
}
export interface ISFile extends ISEventEmitter {
    new (filepath: string, settings?: ISFileSettings): any;
    name: string;
    path: string;
    relPath: string;
    dirPath: string;
    extension: string;
    exists: boolean;
    _content?: string;
    content: string;
    toObject: ISFileToObjectFn;
    update(): void;
    watch(): void;
    unwatch(): void;
    read: ISFileReadFn;
    readSync: ISFileReadSyncFn;
    write: ISFileWriteFn;
    writeSync: ISFileWriteSyncFn;
}
declare class SFile extends __SClass implements ISFile {
    
    static _registeredClasses: Record<string, ISFile>;
    
    static registerClass(pattern: string | string[], cls: any): void;
    
    sourcesFiles: Record<string, SFile>;
    
    static new(path: string, settings?: ISFileSettings): SFile;
    
    _name: string;
    get name(): string;
    
    _nameWithoutExt: string;
    get nameWithoutExt(): string;
    
    _path: string;
    get path(): string;
    
    cwd: any;
    
    exists: any;
    
    events: any;
    
    get relPath(): string;
    
    get dirPath(): string;
    
    extension: any;
    
    constructor(filepath: string, settings?: ISFileSettings);
    
    get hash(): any;
    
    _stats: any;
    get stats(): any;
    
    _raw?: string;
    get raw(): any;
    
    _content?: string;
    get content(): any;
    set content(value: any);
    
    _commits: ISFileCommit[];
    get commits(): ISFileCommit[];
    
    toObject(readContent?: boolean): ISFileObject;
    
    update(): void;
    
    _watcher: any;
    watch(callback?: Function): void;
    
    unwatch(): void;
    
    toString(): string;
    
    duplicate(to?: any): Promise<SFile>;
    
    duplicateSync(to?: any): SFile;
    
    save(): Promise<SFile>;
    
    saveSync(): SFile;
    
    unlink(): Promise<boolean | Error>;
    
    unlinkSync(): boolean;
    
    read(settings?: Partial<ISFileReadSettings>): Promise<string>;
    
    readSync(settings?: Partial<ISFileReadSettings>): string;
    
    write(data: string, settings?: Partial<ISFileWriteSettings>): Promise<any>;
    
    writeSync(data: string, settings?: Partial<ISFileWriteSettings>): any;
}
export default SFile;
