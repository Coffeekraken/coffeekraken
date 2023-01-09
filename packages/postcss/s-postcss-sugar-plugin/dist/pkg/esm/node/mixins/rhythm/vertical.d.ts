import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
    static get _definition(): {
        themePath: {
            description: string;
            type: string;
        };
    };
}
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };
export interface postcssSugarPluginRhythmVerticalMixinParams {
    themePath?: string;
}

export default function ({ params, atRule, postcssApi, }: {
    params: Partial<postcssSugarPluginRhythmVerticalMixinParams>;
    atRule: any;
    postcssApi: any;
}): void;
