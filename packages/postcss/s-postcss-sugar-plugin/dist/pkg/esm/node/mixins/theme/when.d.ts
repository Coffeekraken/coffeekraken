import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
    static get _definition(): {
        variant: {
            type: string;
        };
        theme: {
            type: string;
        };
    };
}
export { postcssSugarPluginThemeWhenMixinInterface as interface };
export interface postcssSugarPluginThemeWhenMixinParams {
    variant?: string;
    theme?: string;
}

export default function ({ params, atRule, postcssApi, }: {
    params: Partial<postcssSugarPluginThemeWhenMixinParams>;
    atRule: any;
    postcssApi: any;
}): void;
