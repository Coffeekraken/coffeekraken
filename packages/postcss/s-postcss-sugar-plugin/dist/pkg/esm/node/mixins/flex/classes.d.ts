import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFlexClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginFlexClassesParams {
}
export { postcssSugarPluginFlexClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFlexClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
