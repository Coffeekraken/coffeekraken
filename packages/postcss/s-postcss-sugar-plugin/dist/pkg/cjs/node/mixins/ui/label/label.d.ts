import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiLabelInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiLabelParams {
    lnf: 'inline' | 'block' | 'float';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiLabelInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiLabelParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
