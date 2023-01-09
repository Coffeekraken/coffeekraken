import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginHighlightjsThemeInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginHighlightjsThemeParams {
}
export { postcssSugarPluginHighlightjsThemeInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginHighlightjsThemeParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
