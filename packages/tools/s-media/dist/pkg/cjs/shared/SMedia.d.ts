import __SClass from '@coffeekraken/s-class';
import type { ISMedia } from '@specimen/types';
export interface IBuildQuerySettings {
    media: ISMedia;
    method?: 'container' | 'media';
    containerName?: string;
}
export interface ISMediaLayoutCssResult {
    css: string;
    areas: number[];
}

export default class SMedia extends __SClass {
    private _media;
    get defaultAction(): '>' | '>=' | '<' | '<=' | '=';
    get defaultMedia(): string;
    get medias(): string[];
    
    constructor(settings?: {});
    
    countAreas(layout: string): number;
    
    buildQuery(queryString: string, settings?: Partial<IBuildQuerySettings>): string;
    
    layoutCss(layout: string | any, settings?: any): ISMediaLayoutCssResult;
    
    sortQueries(media?: any): any;
}
