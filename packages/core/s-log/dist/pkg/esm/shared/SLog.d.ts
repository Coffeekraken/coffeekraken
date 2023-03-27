import type { ISLogMargin, ISLogType } from './ISLog';
import ISLog from './ISLog';

export default class SLog {
    
    static TYPE_LOG: ISLogType;
    
    static TYPE_INFO: ISLogType;
    
    static TYPE_WARN: ISLogType;
    
    static TYPE_ERROR: ISLogType;
    
    static TYPE_SUCCESS: ISLogType;
    
    static TYPES: ISLogType[];
    
    static PRESET_SILENT: ISLogType[];
    
    static PRESET_DEFAULT: ISLogType[];
    
    static PRESET_WARN: ISLogType[];
    
    static PRESET_ERROR: ISLogType[];
    
    static PRESET_VERBOSE: ISLogType[];
    
    static PRESETS: string[];
    
    static _filteredTypes: string[];
    
    static _filterFunctions: Function[];
    
    static _filteredTypes: ISLogType[];
    static filter(filter: ISLogType[] | Function): void;
    
    static clearFilters(): void;
    
    static _defaultLogObj: Partial<ISLog>;
    static setDefaultLogObj(logObj: Partial<ISLog>): void;
    
    static isTypeEnabled(types: ISLogType | ISLogType[]): boolean;
    
    private _logObj;
    
    constructor(logObj: Partial<ISLog>);
    
    get value(): any;
    set value(value: any);
    
    get metas(): any;
    set metas(value: any);
    
    get type(): string;
    
    get group(): string;
    set group(value: string);
    
    get active(): boolean;
    
    get decorators(): boolean;
    set decorators(value: boolean);
    
    get time(): boolean;
    
    get timestamp(): number;
    
    get clear(): boolean;
    
    get margin(): ISLogMargin;
    
    get temp(): boolean;
    
    get as(): string;
    
    get verbose(): boolean;
    set verbose(value: boolean);
    
    get notify(): boolean;
    set notify(value: boolean);
    
    get logger(): Function;
}
