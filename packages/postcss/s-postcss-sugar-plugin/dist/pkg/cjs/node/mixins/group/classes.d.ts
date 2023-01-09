import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginGroupClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginGroupClassesParams {
}
export { postcssSugarPluginGroupClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginGroupClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
