import type { ISSpec } from './specTypes';
export interface ISNumber {
    value: number;
}
export interface ISNumberSpec extends ISSpec {
    min?: number;
    max?: number;
}
