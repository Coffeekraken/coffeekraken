import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import type { IResolveGlobSettings } from '@coffeekraken/s-glob';

export interface ISFaviconBuilderSettings extends ISBuilderSettings {
    resolveGlob: Partial<IResolveGlobSettings>;
}
export interface ISFaviconBuilderBuildParams {
    input: string;
    outDir: string;
    settings: any;
}
export interface ISFaviconBuilderImageResult {
    source: __SFile;
    builded: __SFile[];
    webp: __SFile[];
}
export interface ISFaviconBuilderResultItem extends ISFaviconBuilderStats {
    fromSourceGain?: ISFaviconBuilderStats;
    fromBuildedGain?: ISFaviconBuilderStats;
}
export interface ISFaviconBuilderAddParams {
    output: string;
}
export interface ISFaviconBuilderStats {
    percentage?: number;
    bytes: number | string;
    kbytes: number | string;
    mbytes: number | string;
    gbytes: number | string;
}
export interface ISFaviconBuilderResult {
    source: ISFaviconBuilderResultItem;
    builded: ISFaviconBuilderResultItem;
    webp: ISFaviconBuilderResultItem;
    files: Record<string, ISFaviconBuilderImageResult>;
}
export default class SFaviconBuilder extends __SBuilder {
    
    constructor(settings?: Partial<ISFaviconBuilderSettings>);
    
    _build(params: ISFaviconBuilderBuildParams, settings?: Partial<ISFaviconBuilderSettings>): Promise<ISFaviconBuilderResult | void>;
}
