import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiMediaInterface extends __SInterface {
    static get _definition(): {
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
export interface IPostcssSugarPluginUiMediaParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssSugarPluginUiMediaInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiMediaParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
