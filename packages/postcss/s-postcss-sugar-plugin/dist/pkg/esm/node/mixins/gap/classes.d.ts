import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginGapClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginGapClassesParams {
}
export { postcssSugarPluginGapClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginGapClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
