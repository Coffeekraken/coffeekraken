import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';

export interface ISMarkdownBuilderLogSettings {
    summary: boolean;
    preset: boolean;
    cache: boolean;
    verbose: boolean;
}
export interface ISMarkdownBuilderTransformer {
    reg: RegExp;
    transform(data: any, target: 'html' | 'markdown'): string;
}
export interface ISMarkdownBuilderSettings extends ISBuilderSettings {
    transformers: ISMarkdownBuilderTransformer[];
    log: Partial<ISMarkdownBuilderLogSettings>;
}
export interface ISMarkdownBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    code: string;
    error?: string;
}
export interface ISMarkdownBuilderTokenExtractResult {
    raw: string;
    [key: string]: any;
}
export interface ISMarkdownBuilderTokenExtractFn {
    (source: string): ISMarkdownBuilderTokenExtractResult[];
}
export interface ISMarkdownBuilderTokenRenderFn {
    (params: any, target: 'html' | 'markdown'): string;
}
export interface ISMarkdownBuilderToken {
    extract: ISMarkdownBuilderTokenExtractFn;
    render: ISMarkdownBuilderTokenRenderFn;
}
export interface ISMarkdownBuilderBuildParams {
    glob: string;
    inDir: string;
    inPath: string;
    inRaw: string;
    outDir: string;
    outPath: string;
    data: any;
    save: boolean;
    cache: boolean;
    target: 'html' | 'markdown';
    preset: string[];
    print: boolean;
}
export default class SMarkdownBuilder extends __SBuilder {
    static _registeredTransformers: any;
    
    
    static _registerTransformer(name: string, transformerPath: string): void;
    
    static _marked: any;
    
    constructor(settings?: Partial<ISMarkdownBuilderSettings>);
    _loaded: boolean;
    _load(): Promise<void>;
    
    _build(params: ISMarkdownBuilderBuildParams): Promise<ISMarkdownBuilderResult[]>;
}
