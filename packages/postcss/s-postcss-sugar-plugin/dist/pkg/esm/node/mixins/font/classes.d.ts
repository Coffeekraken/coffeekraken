import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFontClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginFontClassesParams {
}
export { postcssSugarPluginFontClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFontClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
