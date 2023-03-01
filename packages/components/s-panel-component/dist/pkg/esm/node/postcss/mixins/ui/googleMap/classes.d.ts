import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiGoogleMapClassesInterface extends __SInterface {
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
export interface IPostcssUiGoogleMapClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiGoogleMapClassesInterface as interface };

export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiGoogleMapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
