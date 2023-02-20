import type { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface';
import __SSitemapBuilderSource, { ISSitemapBuilderSourceResult } from '../SSitemapBuilderSource';

export interface ISSitemapBuilderDocmapSourceSettings {
}
export default class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
    
    static settingsId: string;
    
    constructor(settings?: Partial<ISSitemapBuilderDocmapSourceSettings>);
    
    build(params?: Partial<ISSitemapBuilderBuildParams>): Promise<ISSitemapBuilderSourceResult>;
}
