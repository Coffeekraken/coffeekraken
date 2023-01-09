import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition(): {
        size: {
            type: string;
            values: string[];
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginFontFamilyParams {
    size: string | number;
}
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
