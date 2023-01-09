import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiloaderRoundMixinInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiloaderRoundMixinParams {
    name: string;
    duration: string;
    easing: string;
}
export { postcssSugarPluginUiloaderRoundMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiloaderRoundMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
