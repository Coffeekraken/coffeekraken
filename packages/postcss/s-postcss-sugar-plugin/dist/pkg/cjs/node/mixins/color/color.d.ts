import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginColorMixinInterface extends __SInterface {
    static get _definition(): {
        current: {
            type: string;
            required: boolean;
        };
        accent: {
            type: string;
        };
        complementary: {
            type: string;
        };
    };
}
export { postcssSugarPluginColorMixinInterface as interface };

export interface IPostcssSugarPluginColorParams {
    current: string;
    accent?: string;
    complementary?: string;
}
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginColorParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
