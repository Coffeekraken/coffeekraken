import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginShapeClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginShapeClassesParams {
}
export { postcssSugarPluginShapeClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginShapeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
