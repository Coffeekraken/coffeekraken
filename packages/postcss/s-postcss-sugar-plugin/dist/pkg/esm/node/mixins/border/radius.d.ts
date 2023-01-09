import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
    static get _definition(): {
        radius: {
            type: string;
            required: boolean;
            default: any;
        };
    };
}
export interface IPostcssSugarPluginBorderRadiusMixinParams {
    radius: string | number;
}
export { postcssSugarPluginBorderRadiusMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginBorderRadiusMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
