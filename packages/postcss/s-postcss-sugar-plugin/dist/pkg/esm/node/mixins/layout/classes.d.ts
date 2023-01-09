import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLayoutClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginLayoutClassesParams {
}
export { postcssSugarPluginLayoutClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginLayoutClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
