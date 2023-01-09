import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLodWhenMixinInterface extends __SInterface {
    static get _definition(): {
        level: {
            type: string;
            required: boolean;
        };
        method: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export { postcssSugarPluginLodWhenMixinInterface as interface };
export interface postcssSugarPluginLodWhendMixinParams {
    level: number | string;
    method: 'remove' | 'file' | 'class';
}
export default function ({ params, atRule, postcssApi, }: {
    params: Partial<postcssSugarPluginLodWhendMixinParams>;
    atRule: any;
    postcssApi: any;
}): void;
