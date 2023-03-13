import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiButtonInterface extends __SInterface {
    static get _definition(): {
        lnf: {
            type: string;
            values: string[];
            default: any;
        };
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
export interface IPostcssSugarPluginUiButtonParams {
    lnf: 'default' | 'gradient' | 'outline' | 'text' | 'loading';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiButtonInterface as interface };

export default function ({ params, atRule, postcssApi, sharedData, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    postcssApi: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
