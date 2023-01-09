import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginRatioClassesParams {
    ratio: number;
}
export { postcssSugarPluginRatioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginRatioClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
