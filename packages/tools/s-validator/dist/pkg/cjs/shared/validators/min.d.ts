import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorMinI18nSettings {
    string: string;
    object: string;
    number: string;
    array: string;
}
export interface ISValidatorMinSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function min(value: any, n: number, settings?: Partial<ISValidatorMinSettings>): ISValidatorResult;
