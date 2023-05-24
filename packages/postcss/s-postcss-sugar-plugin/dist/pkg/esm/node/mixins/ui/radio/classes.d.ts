import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiRadioClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiRangeClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}
export { postcssSugarPluginUiRadioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiRangeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
