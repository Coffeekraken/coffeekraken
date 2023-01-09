import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiTabInterface extends __SInterface {
    static get _definition(): {
        grow: {
            type: string;
            description: string;
            default: boolean;
        };
        fill: {
            type: string;
            description: string;
            default: boolean;
        };
        direction: {
            type: string;
            description: string;
            values: string[];
            default: string;
        };
        outline: {
            type: string;
            description: string;
            default: any;
        };
        scope: {
            type: {
                type: string;
                splitChars: string[];
            };
            description: string;
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginUiTabParams {
    grow: boolean;
    fill: boolean;
    direction: 'horizontal' | 'vertical';
    outline: boolean;
    scope: ('bare' | 'lnf' | 'grow' | 'fill' | 'direction')[];
}
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiTabParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
