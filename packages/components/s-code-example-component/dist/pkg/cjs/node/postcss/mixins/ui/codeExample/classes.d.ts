import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiCodeExampleClassesInterface extends __SInterface {
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
export interface IPostcssUiCodeExampleClassesParams {
    scope: ('bare' | 'lnf' | 'vr' | 'theme')[];
}
export { postcssUiCodeExampleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssUiCodeExampleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
