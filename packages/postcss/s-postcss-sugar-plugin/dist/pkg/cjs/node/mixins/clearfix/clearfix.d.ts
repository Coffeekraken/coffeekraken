import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginClearfixInterface extends __SInterface {
    static get _definition(): {
        clearfix: {
            type: string;
            values: string[];
            default: any;
        };
    };
}
export interface IPostcssSugarPluginClearfixParams {
    clearfix: 'overflow' | 'facebook' | 'micro' | 'after';
}
export { postcssSugarPluginClearfixInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginClearfixParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
