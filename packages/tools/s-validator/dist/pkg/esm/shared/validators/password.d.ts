import type { ISValidatorResult, ISValidatorValidatorSettings } from '../SValidator';

export interface IValidatorPasswordI18nSettings {
    string: string;
}
export interface IValidatorPasswordSettings extends ISValidatorValidatorSettings {
    trim: boolean;
    weakReg: RegExp;
    mediumReg: RegExp;
    strongReg: RegExp;
}
export declare const definition: {
    description: string;
    type: string;
};
export default function password(value: any, level: 'weak' | 'medium' | 'strong', settings?: Partial<IValidatorPasswordSettings>): ISValidatorResult;
