import __SClass from '@coffeekraken/s-class';
import __SDocmap from '@coffeekraken/s-docmap';

export interface ISDocSettingsEndpoints {
    base?: string;
    doc?: string;
}
export interface ISDocSettingsCategory {
    title: string;
    description: string;
    filters?: Record<string, string>;
    children?: Record<string, ISDocSettingsCategory>;
}
export interface ISDocSettings {
    categories: Record<string, ISDocSettingsCategory>;
    endpoints?: ISDocSettings;
}
export default class SDoc extends __SClass {
    _docmap: __SDocmap;
    _docmapJson: any;
    
    constructor(settings?: ISDocSettings);
    
    initOnExpressServer(express: any): void;
}
