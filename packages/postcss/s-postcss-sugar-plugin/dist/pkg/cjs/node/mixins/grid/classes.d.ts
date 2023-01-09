import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginGridClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginGridClassesParams {
}
export { postcssSugarPluginGridClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginGridClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
