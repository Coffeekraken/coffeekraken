import type { ISSpec } from './specTypes';

export interface ISString {
    value: string;
}

export interface ISStringSpec extends ISSpec {
    min?: number;
    max?: number;
}
