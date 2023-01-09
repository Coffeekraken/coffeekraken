import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiSliderClassesInterface extends __SInterface {
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
export interface IPostcssUiSliderClassesParams {
    scope: ('bare' | 'lnf' | 'behavior' | 'vr')[];
}
export { postcssUiSliderClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiSliderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
