import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiMediaClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiMediaClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiMediaClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiMediaClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
