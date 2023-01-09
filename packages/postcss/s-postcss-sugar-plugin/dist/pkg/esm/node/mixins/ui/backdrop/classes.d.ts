import __SInterface from '@coffeekraken/s-interface';

declare class PostcssSugarPluginUiBackdropClassesInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiBackdropClassesParams {
    scope: ('bare' | 'lnf')[];
}
export { PostcssSugarPluginUiBackdropClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBackdropClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
