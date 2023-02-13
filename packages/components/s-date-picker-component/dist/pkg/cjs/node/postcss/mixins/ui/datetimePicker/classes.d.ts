import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiDatetimePickerClassesInterface extends __SInterface {
    static get _definition(): {
        styles: {
            type: string;
            values: string[];
            default: string[];
        };
        defaultLnf: {
            type: string;
            values: string[];
            default: any;
        };
        scope: {
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssUiDatetimePickerInputClassesParams {
    styles: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiDatetimePickerClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiDatetimePickerInputClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
