import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiRatingClassesInterface extends __SInterface {
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
export interface IPostcssUiRatingClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiRatingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiRatingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
