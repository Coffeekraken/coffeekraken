import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiListClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiListClassesParams {
    lnfs: ('dl' | 'ul' | 'ol' | 'icon')[];
    defaultLnf: 'dl' | 'ul' | 'ol' | 'icon';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
