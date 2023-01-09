import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiBlockquoteParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiBlockquoteInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBlockquoteParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
