import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUntilClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginUntilClassesParams {
}
export { postcssSugarPluginUntilClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUntilClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
