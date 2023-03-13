import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition(): {
        query: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginMediaMixinInterface as interface };

export default function ({ params, atRule, postcssApi, registerPostProcessor, }: {
    params: any;
    atRule: any;
    postcssApi: any;
    registerPostProcessor: Function;
}): void;
