import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginMediaContainerMixinInterface extends __SInterface {
    static get _definition(): {
        query: {
            type: string;
            required: boolean;
        };
        containerName: {
            type: string;
        };
    };
}
export { postcssSugarPluginMediaContainerMixinInterface as interface };

export default function ({ params, atRule, postcssApi, registerPostProcessor, }: {
    params: any;
    atRule: any;
    postcssApi: any;
    registerPostProcessor: Function;
}): void;
