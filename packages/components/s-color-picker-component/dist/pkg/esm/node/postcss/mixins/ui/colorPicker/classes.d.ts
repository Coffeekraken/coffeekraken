import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiColorPickerClassesInterface extends __SInterface {
    static get _definition(): {
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
export interface IPostcssUiColorPickerClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiColorPickerClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiColorPickerClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
