import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginColorPrimaryMixinInterface extends __SInterface {
    static get _definition(): {
        color: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginColorPrimaryMixinInterface as interface };

export interface IPostcssSugarPluginColorPrimaryParams {
    color: string;
}
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginColorPrimaryParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): string[];
