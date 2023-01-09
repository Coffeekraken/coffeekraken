import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiCheckboxClassesInterface extends __SInterface {
    static get _definition(): {
        lnfs: {
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
export interface IPostcssSugarPluginUiCheckboxClassesParams {
    lnfs: 'default'[];
    defaultLnf: 'default';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}
export { postcssSugarPluginUiCheckboxClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiCheckboxClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
