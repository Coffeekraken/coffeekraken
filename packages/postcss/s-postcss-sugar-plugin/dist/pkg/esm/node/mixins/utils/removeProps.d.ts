import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUtilsRemovePropsMixinInterface extends __SInterface {
    static get _definition(): {
        props: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginUtilsRemovePropsMixinInterface as interface };
export interface postcssSugarPluginUtilsRemovePropsMixinParams {
    props: string;
}
export default function ({ params, atRule, getRoot, settings, postcssApi, }: {
    params: Partial<postcssSugarPluginUtilsRemovePropsMixinParams>;
    atRule: any;
    getRoot: Function;
    settings: any;
    postcssApi: any;
}): void;
