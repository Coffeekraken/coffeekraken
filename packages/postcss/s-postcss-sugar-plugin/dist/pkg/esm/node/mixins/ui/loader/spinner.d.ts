import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiLoaderSpinnerMixinInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiLoaderSpinnerMixinParams {
    name: string;
    duration: string;
    easing: string;
}
export { postcssSugarPluginUiLoaderSpinnerMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiLoaderSpinnerMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
