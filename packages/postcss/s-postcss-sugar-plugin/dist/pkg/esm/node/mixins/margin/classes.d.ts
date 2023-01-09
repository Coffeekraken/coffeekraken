import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginMarginClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginMarginClassesParams {
}
export { postcssSugarPluginMarginClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginMarginClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
