import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SSitemapBuilderSource from './SSitemapBuilderSource';

export type ISSitemapBuilderTypes = 'docmap' | 'frontspec';
export interface ISSitemapBuilderSources {
    [key: string]: __SSitemapBuilderSource;
}
export interface ISSitemapBuilderBuildParams {
    source: string[];
    sourcesSettings: any;
    output: string;
    save: boolean;
}
export interface ISSitemapBuilderResultItem {
    loc: string;
    lastmod: string;
    integrity?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}
export interface ISSitemapBuilderBuildResult {
}
export interface ISSitemapBuilderSourcesSettings {
    [key: string]: ISSitemapBuilderSourceSettings;
}
export interface ISSitemapBuilderSourceSettings {
    active: boolean;
    settings: any;
    path: string;
}
export interface ISSitemapBuilderSourceBuildResult {
    logs: string[];
    items: ISSitemapBuilderResultItem[];
}
export interface ISSitemapBuilderSettings extends ISBuilderSettings {
    sources: ISSitemapBuilderSourcesSettings;
}
export default class SSitemapBuilder extends __SBuilder {
    
    constructor(settings?: Partial<ISSitemapBuilderSettings>);
    
    _build(params?: Partial<ISSitemapBuilderBuildParams>): Promise<ISSitemapBuilderBuildResult>;
    
    save(items: ISSitemapBuilderResultItem[], path: string): void;
}
