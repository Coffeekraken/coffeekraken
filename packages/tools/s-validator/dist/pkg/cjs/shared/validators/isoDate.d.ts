import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorIsoDateI18nSettings {
    string: string;
}
export interface IValidatorIsoDateSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoDateI18nSettings;
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function isoDate(value: any, settings?: Partial<IValidatorIsoDateSettings>): ISValidatorResult;
