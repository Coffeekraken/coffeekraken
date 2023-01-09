import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginOrderClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginOrderClassesParams {
}
export { postcssSugarPluginOrderClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginOrderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
