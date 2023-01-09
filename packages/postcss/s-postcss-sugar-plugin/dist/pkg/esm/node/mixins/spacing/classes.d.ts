import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginSpacingClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginSpacingClassesParams {
}
export { postcssSugarPluginSpacingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginSpacingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
