import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiLoaderDropMixinInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            default: string;
        };
        duration: {
            type: string;
            default: any;
        };
        easing: {
            type: string;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginUiloaderDropMixinParams {
    name: string;
    duration: string;
    easing: string;
}
export { postcssSugarPluginUiLoaderDropMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiloaderDropMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
