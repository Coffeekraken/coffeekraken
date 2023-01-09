import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginAssetPlatformInterface extends __SInterface {
    static get _definition(): {
        platform: {
            type: string;
            values: string[];
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginAssetPlatformParams {
    platform: string;
}
export { postcssSugarPluginAssetPlatformInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginAssetPlatformParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
