import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginOpacityClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginOpacityClassesParams {
}
export { postcssSugarPluginOpacityClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginOpacityClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
