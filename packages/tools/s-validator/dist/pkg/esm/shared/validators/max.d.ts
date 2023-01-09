import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorMaxI18nSettings {
    string: string;
    object: string;
    number: string;
    array: string;
}
export interface IValidatorMaxSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function max(value: any, n: number, settings?: Partial<IValidatorMaxSettings>): ISValidatorResult;
