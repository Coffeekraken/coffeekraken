import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginAutoloadMixinInterface extends __SInterface {
    static get _definition(): {
        glob: {
            type: string;
            description: string;
            default: string;
        };
        depth: {
            type: string;
            description: string;
            default: number;
        };
    };
}
export interface IPostcssSugarPluginAutoloadMixinParams {
    glob: string;
    depth: number;
}
export { postcssSugarPluginAutoloadMixinInterface as interface };
export default function ({ params, atRule, CssVars, getRoot, postcssApi, replaceWith, }: {
    params: Partial<IPostcssSugarPluginAutoloadMixinParams>;
    atRule: any;
    CssVars: any;
    getRoot: Function;
    postcssApi: any;
    replaceWith: Function;
}): any;
