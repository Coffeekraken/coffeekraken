import type { ISSpec } from './specTypes';
export interface ISDatetime {
    iso: string;
    value: string;
    format: string;
}
export interface ISDatetimeSpec extends ISSpec {
    format: string;
    calendar?: boolean;
    min?: string;
    max?: string;
}
