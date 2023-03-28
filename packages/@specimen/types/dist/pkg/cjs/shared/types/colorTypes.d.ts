import type { ISSpec } from './specTypes';
export interface ISColor {
    h?: number;
    s?: number;
    l?: number;
    a?: number;
    r?: number;
    g?: number;
    b?: number;
    hex?: string;
    hexa?: string;
    format: 'hex' | 'hexa' | 'hsl' | 'hsla' | 'rgb' | 'rgba';
    value: string;
}
export interface ISColorSpec extends ISSpec {
    format: 'hex' | 'hexa' | 'hsl' | 'hsla' | 'rgb' | 'rgba';
}
