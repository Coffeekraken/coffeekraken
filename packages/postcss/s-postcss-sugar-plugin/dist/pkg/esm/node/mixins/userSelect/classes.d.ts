import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUserSelectClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginUserSelectClassesParams {
}
export { postcssSugarPluginUserSelectClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUserSelectClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
