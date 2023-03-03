import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginThemeMixinInterface extends __SInterface {
    static get _definition(): {
        variant: {
            type: string;
        };
        theme: {
            type: string;
        };
    };
}
export { postcssSugarPluginThemeMixinInterface as interface };
export interface postcssSugarPluginThemeMixinParams {
    variant?: string;
    theme?: string;
}

export default function ({ params, atRule, postcssApi, }: {
    params: Partial<postcssSugarPluginThemeMixinParams>;
    atRule: any;
    postcssApi: any;
}): void;
