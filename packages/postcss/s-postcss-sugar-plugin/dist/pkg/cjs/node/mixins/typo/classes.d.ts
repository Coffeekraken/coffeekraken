import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginTypoClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginTypoClassesParams {
}
export { postcssSugarPluginTypoClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginTypoClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
