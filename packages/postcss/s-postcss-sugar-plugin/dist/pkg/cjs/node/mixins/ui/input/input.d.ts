import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiFormInputInterface extends __SInterface {
    static get _definition(): {
        lnf: {
            type: string;
            values: string[];
            default: any;
        };
        outline: {
            type: string;
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
export interface IPostcssSugarPluginUiFormInputParams {
    lnf: 'default' | 'underline';
    outline: boolean;
    scope: string[];
}
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiFormInputParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
