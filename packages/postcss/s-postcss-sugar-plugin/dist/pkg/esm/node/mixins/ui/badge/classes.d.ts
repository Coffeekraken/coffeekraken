import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiBadgeClassesInterface extends __SInterface {
    static get _definition(): {
        lnfs: {
            type: string;
            values: string[];
            default: string[];
        };
        defaultLnf: {
            type: string;
            values: string[];
            default: string;
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
export interface IPostcssSugarPluginUiBadgeClassesParams {
    lnfs: ('default' | 'outline')[];
    defaultLnf: 'default' | 'outline';
    scope: ('bare' | 'lnf' | 'vr')[];
}
export { postcssSugarPluginUiBadgeClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBadgeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
