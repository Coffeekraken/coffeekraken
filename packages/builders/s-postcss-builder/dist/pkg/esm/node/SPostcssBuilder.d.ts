import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';

export interface ISPostcssBuilderSettings extends ISBuilderSettings {
    postcss: any;
    purgecss: any;
}
export interface ISPostcssBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    css: string;
    map: null;
}
export interface ISPostcssBuilderBuildParams {
    input: string;
    output: string;
    purge: boolean;
    minify: boolean;
    target: 'development' | 'production';
    saveDev: boolean;
}
export default class SPostcssBuilder extends __SBuilder {
    
    constructor(settings?: Partial<ISPostcssBuilderSettings>);
    
    _build(params: ISPostcssBuilderBuildParams): Promise<ISPostcssBuilderResult>;
}
