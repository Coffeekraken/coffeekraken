import type { ISSpec } from './specTypes';
export interface ISCheckbox {
    options: ISCheckboxOption[];
    value: any[];
}
export interface ISCheckboxOption {
    name: string;
    value: any;
    checked?: boolean;
}
export interface ISCheckboxSpec extends ISSpec {
    options: ISCheckboxOptionSpec[];
    min?: number;
    max?: number;
    multiple?: boolean;
}
export interface ISCheckboxOptionSpec {
    name: string;
    value: any;
}
