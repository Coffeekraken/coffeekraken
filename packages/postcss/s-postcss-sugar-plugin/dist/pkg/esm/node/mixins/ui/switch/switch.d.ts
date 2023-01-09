import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiSwitchMixinParams {
    lnf: 'default';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiSwitchMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiSwitchMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
