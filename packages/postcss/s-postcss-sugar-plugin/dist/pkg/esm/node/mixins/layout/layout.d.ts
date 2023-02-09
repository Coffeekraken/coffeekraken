import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginLayoutInterface extends __SInterface {
    static get _definition(): {
        layout: {
            type: string;
            required: boolean;
        };
        gap: {
            type: string;
        };
        columnGap: {
            type: string;
        };
        rowGap: {
            type: string;
        };
        gapBetween: {
            type: string;
            default: boolean;
        };
        align: {
            type: string;
            values: string[];
            default: string;
        };
        justify: {
            type: string;
            values: string[];
            default: string;
        };
        scope: {
            type: string;
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssSugarPluginLayoutParams {
    layout: string;
    gap: number;
    columnGap: number;
    rowGap: number;
    gapBetween: boolean;
    align: 'start' | 'end' | 'center' | 'stretch';
    justify: 'start' | 'end' | 'center' | 'stretch';
    scope: string[];
}
export { postcssSugarPluginLayoutInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: IPostcssSugarPluginLayoutParams;
    atRule: any;
    replaceWith: Function;
}): string[];
