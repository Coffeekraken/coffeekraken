import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiThemeSwitcherClassesInterface extends __SInterface {
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
export interface IPostcssUiThemeSwitcherClassesParams {
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssUiThemeSwitcherClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiThemeSwitcherClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
