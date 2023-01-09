import __SClass from '@coffeekraken/s-class';
import type { ISSitemapBuilderBuildParams } from './interface/SSitemapBuilderBuildParamsInterface';
import type { ISSitemapBuilderResultItem } from './SSitemapBuilder';

export interface ISSitemapBuilderSourceSettings {
}
export type ISSitemapBuilderSourceResult = ISSitemapBuilderResultItem[];
export default class SSitemapBuilderSource extends __SClass {
    
    constructor(settings?: Partial<ISSitemapBuilderSourceSettings>);
    
    build(params?: Partial<ISSitemapBuilderBuildParams>): Promise<ISSitemapBuilderSourceResult>;
}
