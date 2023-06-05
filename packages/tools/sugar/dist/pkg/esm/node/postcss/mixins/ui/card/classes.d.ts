import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiCardClassesInterface extends __SInterface {
    static get _definition(): {
        direction: {
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
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
export interface IPostcssUiCardClassesParams {
    direction: ('vertical' | 'vertical-reverse' | 'horizontal' | 'horizontal-reverse')[];
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiCardClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiCardClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
