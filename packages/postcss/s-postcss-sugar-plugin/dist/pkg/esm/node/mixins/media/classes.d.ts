import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginMediaClassesMixinInterface extends __SInterface {
    static get _definition(): {
        query: {
            type: string;
            default: string;
        };
    };
}
export interface IPostcssSugarPluginMediaMixinClassesParams {
    query: string;
}
export { postcssSugarPluginMediaClassesMixinInterface as interface };
export default function ({ params, atRule, getRoot, postcssApi, postcss, registerPostProcessor, nodesToString, replaceWith, }: {
    params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
    atRule: any;
    getRoot: Function;
    postcssApi: any;
    postcss: any;
    registerPostProcessor: Function;
    nodesToString: Function;
    replaceWith: Function;
}): void;
