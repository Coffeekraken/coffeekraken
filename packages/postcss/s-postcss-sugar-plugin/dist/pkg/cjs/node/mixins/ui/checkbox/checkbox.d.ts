import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiCheckboxInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiCheckboxParams {
    lnf: 'solid';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiCheckboxInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiCheckboxParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
