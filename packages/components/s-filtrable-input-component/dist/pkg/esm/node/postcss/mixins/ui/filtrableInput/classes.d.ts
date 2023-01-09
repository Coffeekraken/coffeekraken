import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiFiltrableInputClassesInterface extends __SInterface {
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
export interface IPostcssUiFiltrableInputClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiFiltrableInputClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiFiltrableInputClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
