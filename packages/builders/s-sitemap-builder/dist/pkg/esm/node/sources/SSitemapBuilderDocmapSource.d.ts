import type { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface';
import type { ISSitemapBuilderResultItem } from '../SSitemapBuilder';
import __SSitemapBuilderSource from '../SSitemapBuilderSource';

export interface ISSitemapBuilderDocmapSourceSettings {
}
export default class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
    
    static settingsId: string;
    
    constructor(settings?: Partial<ISSitemapBuilderDocmapSourceSettings>);
    
    build(params?: Partial<ISSitemapBuilderBuildParams>): Promise<ISSitemapBuilderResultItem[]>;
}
