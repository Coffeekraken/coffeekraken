import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiTableInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiTableParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiTableInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiTableParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
