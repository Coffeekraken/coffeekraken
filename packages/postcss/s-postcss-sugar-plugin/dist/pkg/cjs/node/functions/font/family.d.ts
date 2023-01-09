import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            required: boolean;
            alias: string;
        };
    };
}
export { postcssSugarPluginFontFamilyInterface as interface };
export interface IPostcssSugarPluginFontFamilyParams {
    name: string;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
}): string;
