import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiLabelClassesParams {
    lnfs: ('inline' | 'float')[];
    defaultLnf: 'inline' | 'float';
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssSugarPluginUiLabelClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiLabelClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
