import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginDisplayClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginDisplayClassesParams {
}
export { postcssSugarPluginDisplayClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginDisplayClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
