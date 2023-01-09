import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiToggleClassesInterface extends __SInterface {
    static get _definition(): {
        types: {
            type: string;
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginUiToggleClassesParams {
    types: 'burger'[];
}
export { postcssSugarPluginUiToggleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiToggleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
