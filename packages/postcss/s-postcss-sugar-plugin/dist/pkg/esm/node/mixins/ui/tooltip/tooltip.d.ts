import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiTooltipInterface extends __SInterface {
    static get _definition(): {
        lnf: {
            type: string;
            values: string[];
            default: any;
        };
        position: {
            type: string;
            values: string[];
            default: any;
        };
        interactive: {
            type: string;
            default: boolean;
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
export interface IPostcssSugarPluginUiTooltipParams {
    lnf: 'solid';
    position: 'top' | 'right' | 'bottom' | 'left';
    interactive: Boolean;
    scope: ('bare' | 'lnf' | 'position' | 'interactive' | 'vr')[];
}
export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiTooltipParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
