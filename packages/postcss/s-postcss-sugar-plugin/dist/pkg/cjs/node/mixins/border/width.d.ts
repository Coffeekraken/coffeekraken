import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginBorderwidthMixinInterface extends __SInterface {
    static get _definition(): {
        width: {
            type: string;
            required: boolean;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginBorderwidthMixinParams {
    width: string | number;
}
export { postcssSugarPluginBorderwidthMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginBorderwidthMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
