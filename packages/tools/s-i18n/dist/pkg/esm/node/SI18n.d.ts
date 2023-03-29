import __SI18n from '../shared/SI18n';

export interface ISI18nExtractParams {
    glob: string;
    outDir: string;
    fileName: string;
}
export interface ISI18nExtractResult {
}
export default class SI18n extends __SI18n {
    
    constructor(settings?: {});
    
    extract(params: Partial<ISI18nExtractParams>): Promise<ISI18nExtractResult>;
}
