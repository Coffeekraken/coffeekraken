import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorIntegerI18nSettings {
    string: string;
}
export interface IValidatorIntegerSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorIntegerI18nSettings;
    trim: boolean;
    cast: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function integer(value: any, settings?: Partial<IValidatorIntegerSettings>): ISValidatorResult;
