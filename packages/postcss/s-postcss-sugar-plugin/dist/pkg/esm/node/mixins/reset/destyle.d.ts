import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginResetDestyleInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginResetDestyleParams {
}
export { postcssSugarPluginResetDestyleInterface as interface };
export default function ({ params, CssVars, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginResetDestyleParams>;
    CssVars: any;
    atRule: any;
    replaceWith: Function;
}): any;
