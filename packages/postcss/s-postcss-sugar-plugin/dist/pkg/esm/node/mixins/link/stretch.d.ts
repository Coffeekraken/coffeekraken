import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLinkStretchInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginLinkStretchParams {
    dotPath: string;
    exclude: string[];
    only: string[];
}
export { postcssSugarPluginLinkStretchInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginLinkStretchParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
