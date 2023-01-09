import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginActiveClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginActiveClassesParams {
}
export { postcssSugarPluginActiveClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginActiveClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
