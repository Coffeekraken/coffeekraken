import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
    static get _definition(): {
        platforms: {
            type: string;
        };
    };
}
export interface IPostcssSugarPluginPlatformClassesParams {
    platforms: string[];
}
export { postcssSugarPluginPlatformClassesMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginPlatformClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
