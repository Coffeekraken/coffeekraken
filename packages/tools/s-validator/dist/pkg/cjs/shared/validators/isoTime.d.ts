import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorIsoTimeI18nSettings {
    string: string;
}
export interface IValidatorIsoTimeSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoTimeI18nSettings;
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function isoTime(value: any, settings?: Partial<IValidatorIsoTimeSettings>): ISValidatorResult;
