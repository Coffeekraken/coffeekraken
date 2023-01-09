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
export default function ({ params, atRule, CssVars, pluginHash, themeHash, cacheDir, nodesToString, settings, replaceWith, }: {
    params: Partial<IPostcssSugarPluginCacheParams>;
    atRule: any;
    CssVars: any;
    pluginHash: string;
    themeHash: string;
    cacheDir: string;
    nodesToString: Function;
    settings: any;
    replaceWith: Function;
}): any;
