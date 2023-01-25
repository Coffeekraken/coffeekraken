import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';

export interface ISStaticBuilderSettings extends ISBuilderSettings {
}
export interface ISStaticBuilderResult {
    input?: __SFile;
    outDir?: __SFile;
    css: string;
    map: null;
}
export interface ISStaticBuilderAssets {
    [key: string]: ISStaticBuilderAsset;
}
export interface ISStaticBuilderAsset {
    from: string;
    glob: string;
    to: string;
}
export interface ISStaticBuilderBuildParams {
    input: string;
    outDir: string;
    host: string;
    fromErrors: boolean;
    useFrontendServer: boolean;
    clean: boolean;
    incremental: boolean;
    assets: ISStaticBuilderAssets;
    failAfter: number;
    requestTimeout: number;
    requestRetry: number;
    requestRetryTimeout: number;
    minify: boolean;
    target: 'production' | 'development';
}
export default class SStaticBuilder extends __SBuilder {
    
    constructor(settings?: Partial<ISStaticBuilderSettings>);
    
    _build(params: ISStaticBuilderBuildParams): Promise<ISStaticBuilderResult | void>;
}
