import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiLoaderSquareDotsMixinInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            default: string;
        };
        duration: {
            type: string;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginUiLoaderSquareDotsMixinParams {
    name: string;
    duration: string;
}
export { postcssSugarPluginUiLoaderSquareDotsMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiLoaderSquareDotsMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
