import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLodFilterMixinInterface extends __SInterface {
    static get _definition(): {
        level: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginLodFilterMixinInterface as interface };
export interface postcssSugarPluginLodFilterMixinParams {
    level: number | string;
}
export default function ({ params, atRule, settings, postcssApi, }: {
    params: Partial<postcssSugarPluginLodFilterMixinParams>;
    atRule: any;
    settings: any;
    postcssApi: any;
}): void;
