import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiFsTreeClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiFsTreelassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiFsTreeClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiFsTreelassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
