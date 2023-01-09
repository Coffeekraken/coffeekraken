import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorHexI18nSettings {
    string: string;
}
export interface IValidatorHexSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function hex(value: any, settings?: Partial<IValidatorHexSettings>): ISValidatorResult;
