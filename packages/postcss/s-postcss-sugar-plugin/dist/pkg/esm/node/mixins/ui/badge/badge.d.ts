import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiBadgeInterface extends __SInterface {
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
export interface IPostcssSugarPluginUiBadgeParams {
    lnf: 'default' | 'outline';
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
