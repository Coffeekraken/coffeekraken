import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorIsoDateTimeI18nSettings {
    string: string;
}
export interface IValidatorIsoDateTimeSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoDateTimeI18nSettings;
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function isoDateTime(value: any, settings?: Partial<IValidatorIsoDateTimeSettings>): ISValidatorResult;
