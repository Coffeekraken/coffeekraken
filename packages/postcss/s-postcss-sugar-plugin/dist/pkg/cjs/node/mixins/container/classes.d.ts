import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginContainerClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginContainerClassesParams {
}
export { postcssSugarPluginContainerClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginContainerClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
