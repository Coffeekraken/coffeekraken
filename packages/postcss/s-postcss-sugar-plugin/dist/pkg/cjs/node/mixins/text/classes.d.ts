import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginTextClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginTextClassesParams {
}
export { postcssSugarPluginTextClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginTextClassesParams>;
    atRule: any;
    CssVars: any;
    aby: any;
    replaceWith: Function;
}): any;
