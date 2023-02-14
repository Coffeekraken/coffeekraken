import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiRangeInterface extends __SInterface {
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
    lnf: 'solid';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiRangeInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
