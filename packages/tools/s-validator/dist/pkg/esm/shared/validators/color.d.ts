import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorColorI18nSettings {
    string: string;
}
export interface IValidatorColorSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function color(value: any, settings?: Partial<IValidatorColorSettings>): ISValidatorResult;
