import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiListClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiListClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
