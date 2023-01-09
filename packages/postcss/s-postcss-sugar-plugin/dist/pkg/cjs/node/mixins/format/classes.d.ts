import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFormatClassesInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginFormatClassesParams {
}
export { postcssSugarPluginFormatClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFormatClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
