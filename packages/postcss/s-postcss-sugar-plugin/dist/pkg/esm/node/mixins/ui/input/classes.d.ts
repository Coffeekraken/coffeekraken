import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition(): {
        lnfs: {
            type: string;
            default: string[];
        };
        defaultLnf: {
            type: string;
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
export interface IPostcssSugarPluginUiFormClassesParams {
    lnfs: string[];
    defaultLnf: 'solid' | 'underline';
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssSugarPluginUiFormClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiFormClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
