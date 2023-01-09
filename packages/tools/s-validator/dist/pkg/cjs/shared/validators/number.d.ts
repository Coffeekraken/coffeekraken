import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorIntegerI18nSettings {
    string: string;
}
export interface IValidatorNumberSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorIntegerI18nSettings;
    trim: boolean;
    cast: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function number(value: any, settings?: Partial<IValidatorNumberSettings>): ISValidatorResult;
