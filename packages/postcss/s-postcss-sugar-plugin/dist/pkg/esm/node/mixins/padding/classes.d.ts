import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginPaddingClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginPaddingClassesParams {
}
export { postcssSugarPluginPaddingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginPaddingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
