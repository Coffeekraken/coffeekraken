import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface ISValidatorPattern18nSettings {
    string: string;
}
export interface IValidatorPatternSettings extends ISValidatorValidatorSettings {
    i18n: ISValidatorPattern18nSettings;
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function pattern(value: any, pattern: string, settings?: Partial<IValidatorPatternSettings>): ISValidatorResult;
