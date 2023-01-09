import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiDropdownInterface extends __SInterface {
    static get _definition(): {
        position: {
            type: string;
            values: string[];
            default: string;
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
export interface IPostcssSugarPluginUiDropdownParams {
    position: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
    scope: ('bare' | 'lnf' | 'position')[];
}
export { postcssSugarPluginUiDropdownInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiDropdownParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
