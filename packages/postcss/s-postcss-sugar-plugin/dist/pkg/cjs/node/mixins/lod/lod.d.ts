import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLodMixinInterface extends __SInterface {
    static get _definition(): {
        level: {
            type: string;
            required: boolean;
        };
        method: {
            type: string;
            values: string[];
        };
        keepWhenLodDisabled: {
            type: string;
            default: boolean;
        };
    };
}
export { postcssSugarPluginLodMixinInterface as interface };
export interface postcssSugarPluginLodMixinParams {
    level: number | string;
    method: 'file' | 'class';
    keepWhenLodDisabled: boolean;
}
export default function ({ params, atRule, settings, postcssApi, }: {
    params: Partial<postcssSugarPluginLodMixinParams>;
    atRule: any;
    settings: any;
    postcssApi: any;
}): void;
