import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition(): {
        size: {
            type: string;
            required: boolean;
            alias: string;
        };
        scalable: {
            type: string;
            default: any;
        };
    };
}
export { postcssSugarPluginFontSizeInterface as interface };
export interface IPostcssSugarPluginFontSizeParams {
    size: string;
    scalable: boolean;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginFontSizeParams>;
}): string;
