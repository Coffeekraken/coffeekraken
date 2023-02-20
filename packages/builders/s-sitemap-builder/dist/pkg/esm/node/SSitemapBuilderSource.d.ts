import __SClass from '@coffeekraken/s-class';
import type { ISSitemapBuilderBuildParams } from './interface/SSitemapBuilderBuildParamsInterface';
import type { ISSitemapBuilderResultItem, ISSitemapBuilderSourceBuildResult } from './SSitemapBuilder';

export interface ISSitemapBuilderSourceSettings {
}
export type ISSitemapBuilderSourceResult = ISSitemapBuilderResultItem[] | ISSitemapBuilderSourceBuildResult;
export default class SSitemapBuilderSource extends __SClass {
    
    constructor(settings?: Partial<ISSitemapBuilderSourceSettings>);
    
    build(params?: Partial<ISSitemapBuilderBuildParams>): Promise<ISSitemapBuilderSourceResult>;
}
