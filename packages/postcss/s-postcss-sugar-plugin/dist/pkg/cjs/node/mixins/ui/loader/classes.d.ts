import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
    static get _definition(): {
        loaders: {
            description: string;
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginUiLoaderClassesParams {
    loaders: ('spinner' | 'round' | 'drop' | 'square-dots')[];
}
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiLoaderClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}): any;
