import type { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface';
import __SSitemapBuilderSource, { ISSitemapBuilderSourceResult } from '../SSitemapBuilderSource';

export interface ISSitemapBuilderFileSourceSettings {
    glob: string[] | string;
    inDir: string;
}
export default class SSitemapBuilderFileSource extends __SSitemapBuilderSource {
    
    static settingsId: string;
    
    constructor(settings?: Partial<ISSitemapBuilderFileSourceSettings>);
    
    build(params?: Partial<ISSitemapBuilderBuildParams>): Promise<ISSitemapBuilderSourceResult>;
}
