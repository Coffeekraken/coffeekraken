import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginCacheInterface extends __SInterface {
    static get _definition(): {
        id: {
            type: string;
        };
    };
}
export interface IPostcssSugarPluginCacheParams {
    id: string;
}
export { postcssSugarPluginCacheInterface as interface };
export default function ({ params, atRule, CssVars, nodesToString, postcss, postcssApi, settings, }: {
    params: Partial<IPostcssSugarPluginCacheParams>;
    atRule: any;
    CssVars: any;
    nodesToString: Function;
    postcss: any;
    postcssApi: any;
    settings: any;
}): any;
