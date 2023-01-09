import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginResetInterface extends __SInterface {
    static get _definition(): {};
}
export interface IPostcssSugarPluginResetParams {
}
export { postcssSugarPluginResetInterface as interface };
export declare function dependencies(): {
    files: string[];
};
export default function ({ params, CssVars, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginResetParams>;
    CssVars: any;
    atRule: any;
    replaceWith: Function;
}): any;
