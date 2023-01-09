import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginColorCurrentMixinInterface extends __SInterface {
    static get _definition(): {
        color: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginColorCurrentMixinInterface as interface };

export interface IPostcssSugarPluginColorCurrentParams {
    color: string;
}
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginColorCurrentParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
