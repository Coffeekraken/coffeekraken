import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorRequiredI18nSettings {
    default: string;
}
export interface IValidatorEmailSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function required(value: any, settings?: Partial<IValidatorEmailSettings>): ISValidatorResult;
