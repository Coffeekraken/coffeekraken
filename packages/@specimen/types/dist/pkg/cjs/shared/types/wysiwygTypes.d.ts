import type { ISSpec } from './specTypes';
export interface ISWysiwyg {
    value: string;
}
export interface ISWysiwygSpec extends ISSpec {
    min?: number;
    max?: number;
}
