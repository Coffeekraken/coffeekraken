import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiBlockquoteClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiBlockquoteClassesParams {
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}
export { postcssSugarPluginUiBlockquoteClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBlockquoteClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
