import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorMaxI18nSettings {
    string: string;
}
export interface IValidatorEmailSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function email(value: any, settings?: Partial<IValidatorEmailSettings>): ISValidatorResult;
