import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginHideClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginHideClassesParams {
}
export { postcssSugarPluginHideClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginHideClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
