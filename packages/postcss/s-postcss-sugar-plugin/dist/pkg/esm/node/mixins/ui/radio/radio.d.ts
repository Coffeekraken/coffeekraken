import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiRadioInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiRadioParams {
    lnf: 'default';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiRadioInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiRadioParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
