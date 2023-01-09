import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiListInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiListParams {
    lnf: 'dl' | 'ul' | 'ol' | 'icon';
    scope: string[];
}
export { postcssSugarPluginUiListInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiListParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
