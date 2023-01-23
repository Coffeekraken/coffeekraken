import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import type { IResolveGlobSettings } from '@coffeekraken/s-glob';

export interface ISImagesBuilderSettings extends ISBuilderSettings {
    resolveGlob: Partial<IResolveGlobSettings>;
}
export interface ISImagesBuilderBuildParams {
    glob: string;
    compressExts: string[];
    inDir: string;
    outDir: string;
    quality: number;
    webp: boolean;
    width: number;
    height: number;
    resolution: number[];
    clear: boolean;
    specificParams: Record<string, ISImagesBuilderBuildParams>;
}
export interface ISImagesBuilderImageResult {
    source: __SFile;
    builded: __SFile[];
    webp: __SFile[];
}
export interface ISImagesBuilderResultItem extends ISImagesBuilderStats {
    fromSourceGain?: ISImagesBuilderStats;
    fromBuildedGain?: ISImagesBuilderStats;
}
export interface ISImagesBuilderStats {
    percentage?: number;
    bytes: number | string;
    kbytes: number | string;
    mbytes: number | string;
    gbytes: number | string;
}
export interface ISImagesBuilderResult {
    source: ISImagesBuilderResultItem;
    builded: ISImagesBuilderResultItem;
    webp: ISImagesBuilderResultItem;
    files: Record<string, ISImagesBuilderImageResult>;
}
export default class SImagesBuilder extends __SBuilder {
    
    constructor(settings?: Partial<ISImagesBuilderSettings>);
    
    _build(params: ISImagesBuilderBuildParams, settings?: Partial<ISImagesBuilderSettings>): Promise<ISImagesBuilderResult | void>;
}
