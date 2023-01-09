import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
    static get _definition(): {
        lnfs: {
            type: string;
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
export interface IPostcssSugarPluginUiFormSelectClassesParams {
    lnfs: ('default' | 'underline')[];
    defaultLnf: 'default';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}
export { postcssSugarPluginUiFormSelectClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiFormSelectClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
