import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginTransitionClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginTransitionClassesParams {
}
export { postcssSugarPluginTransitionClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginTransitionClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
