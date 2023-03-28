import type { ISSpec } from './specTypes';

export interface ISDatetime {
    iso: string; // 2011-10-05T14:48:00.000Z
    value: string; // 2023-10-23
    format: string; // YYYY-MM-DD
}

export interface ISDatetimeSpec extends ISSpec {
    format: string;
    calendar?: boolean;
    min?: string;
    max?: string;
}
