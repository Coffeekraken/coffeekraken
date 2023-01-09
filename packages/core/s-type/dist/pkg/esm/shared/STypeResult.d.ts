
export interface ISTypeResultTypeObj {
    type: string;
    value?: any;
}
export interface ISTypeResultIssueObj {
    expected: ISTypeResultTypeObj;
    received: ISTypeResultTypeObj;
    message?: string;
}
export interface ISTypeResultSettings {
    id?: string;
    name?: string;
    throw?: boolean;
    verbose?: boolean;
    customTypes?: boolean;
    interfaces?: boolean;
}
export interface ISTypeResultExpected {
    type: string;
}
export interface ISTypeResultReceived {
    type: string;
}
export interface ISTypeResultData {
    typeString: string;
    value: any;
    expected: ISTypeResultExpected;
    received: ISTypeResultReceived;
    issues: ISTypeResultIssueObj[];
    settings: ISTypeResultSettings;
}
export interface ISTypeResultCtor {
    new (data: ISTypeResultData): ISTypeResult;
}
export interface ISTypeResult {
    typeString?: string;
    value?: any;
    expected: ISTypeResultExpected;
    received: ISTypeResultReceived;
    issues: ISTypeResultIssueObj[];
    settings: ISTypeResultSettings;
    hasIssues(): boolean;
    toString(): string;
    toConsole(): string;
}
declare class STypeResult implements ISTypeResult {
    
    _data: ISTypeResultData;
    
    get typeString(): string;
    
    get value(): any;
    
    get received(): ISTypeResultReceived;
    
    get expected(): ISTypeResultExpected;
    
    get issues(): ISTypeResultIssueObj[];
    
    get settings(): ISTypeResultSettings;
    
    constructor(data: ISTypeResultData);
    
    hasIssues(): boolean;
    
    toString(): string;
    
    toConsole(): string;
}
export default STypeResult;
