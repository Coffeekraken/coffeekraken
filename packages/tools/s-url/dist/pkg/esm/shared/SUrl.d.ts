import __SClass from '@coffeekraken/s-class';

export interface ISUrlSettings {
}
export default class SUrl extends __SClass {
    
    _originUrl: any;
    
    _parsedSchema: {
        errors: any;
        params: any;
        match: boolean;
    };
    
    constructor(url?: string, settings?: Partial<ISUrlSettings>);
    
    _parseSchema(): void;
    
    get schema(): {
        errors: any;
        params: any;
        match: boolean;
    };
    
    set protocol(value: any);
    get protocol(): any;
    
    set slashes(value: any);
    get slashes(): any;
    
    set auth(value: any);
    get auth(): any;
    
    set username(value: any);
    get username(): any;
    
    set password(value: any);
    get password(): any;
    
    set host(value: any);
    get host(): any;
    
    set hostname(value: any);
    get hostname(): any;
    
    set port(value: number);
    get port(): number;
    
    set pathname(value: any);
    get pathname(): any;
    
    set pathnameArray(value: any);
    get pathnameArray(): any;
    
    set query(value: any);
    get query(): any;
    
    set queryString(value: any);
    get queryString(): any;
    
    set hash(value: any);
    get hash(): any;
    
    set href(value: any);
    get href(): any;
    
    set origin(value: any);
    get origin(): any;
    
    toString(): any;
}
