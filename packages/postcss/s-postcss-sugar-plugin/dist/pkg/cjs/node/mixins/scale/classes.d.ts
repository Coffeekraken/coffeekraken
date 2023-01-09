import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginScaleClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginScaleClassesParams {
}
export { postcssSugarPluginScaleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginScaleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
