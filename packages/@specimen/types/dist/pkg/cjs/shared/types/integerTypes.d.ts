import type { ISSpec } from './specTypes';
export interface ISInteger {
    value: string;
}
export interface ISIntegerSpec extends ISSpec {
    min?: number;
    max?: number;
}
