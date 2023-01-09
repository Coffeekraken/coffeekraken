import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiTableClassesInterface extends __SInterface {
    static get _definition(): {
        scope: {
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginUiTableClassesParams {
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}
export { postcssSugarPluginUiTableClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiTableClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
