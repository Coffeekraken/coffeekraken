import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLodOnlyMixinInterface extends __SInterface {
    static get _definition(): {
        level: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginLodOnlyMixinInterface as interface };
export interface postcssSugarPluginLodOnlyMixinParams {
    level: number | string;
}
export default function ({ params, atRule, settings, postcssApi, }: {
    params: Partial<postcssSugarPluginLodOnlyMixinParams>;
    atRule: any;
    settings: any;
    postcssApi: any;
}): void;
