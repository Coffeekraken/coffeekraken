import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiDropdownClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiDropdownClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiDropdownClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiDropdownClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
