import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginDepthClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginDepthClassesParams {
}
export { postcssSugarPluginDepthClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginDepthClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
