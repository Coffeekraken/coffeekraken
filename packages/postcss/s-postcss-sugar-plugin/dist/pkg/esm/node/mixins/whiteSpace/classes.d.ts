import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginWrapClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginWrapClassesParams {
}
export { postcssSugarPluginWrapClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginWrapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
