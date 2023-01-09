import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiFormSelectInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiFormSelectParams {
    lnf: 'default' | 'underline';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiFormSelectInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiFormSelectParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
