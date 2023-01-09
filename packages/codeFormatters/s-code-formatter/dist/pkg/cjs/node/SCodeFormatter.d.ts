import __SClass from '@coffeekraken/s-class';

export interface ISCodeFormatterLogSettings {
    summary: boolean;
    verbose: boolean;
}
export interface ISCodeFormatterSettings {
    timeoutBetweenSameFileProcess: number;
    log: Partial<ISCodeFormatterLogSettings>;
}
export interface ISCodeFormatterFormatParams {
    glob: string;
    inDir: string;
    watch: boolean;
    formatInitial: boolean;
}
export type ISCodeFormatterFormatResult = [];
export interface ISCodeFormatterFormatterMetas {
    filePath: string;
    extension: string;
}
export interface ISCodeFormatterFormatterFormatResult {
    code: string;
}
export interface ISCodeFormatterFormatter {
    id: string;
    extensions: string[];
    languagesToExtensionsMap?: Record<string, string>;
    format(code: string, metas: ISCodeFormatterFormatterMetas): ISCodeFormatterFormatterFormatResult;
}
declare class SCodeFormatter extends __SClass {
    
    private static _registeredFormatters;
    
    static registerFormatter(formatter: ISCodeFormatterFormatter): void;
    
    static getHandledExtensions(): string[];
    
    static getFormatterForExtension(extension: string): ISCodeFormatterFormatter;
    
    constructor(settings?: Partial<ISCodeFormatterSettings>);
    
    formatInline(code: string, language: string, settings?: Partial<ISCodeFormatterSettings>): Promise<String>;
    
    format(params?: any, settings?: any): Promise<ISCodeFormatterFormatResult>;
}
export default SCodeFormatter;
