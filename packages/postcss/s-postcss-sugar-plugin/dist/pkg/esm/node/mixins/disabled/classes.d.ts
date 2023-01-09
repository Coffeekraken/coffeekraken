import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFixClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginFitClassesParams {
}
export { postcssSugarPluginFixClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFitClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
