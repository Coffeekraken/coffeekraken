import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginRatioInterface extends __SInterface {
    static get _definition(): {
        ratio: {
            type: string;
            required: boolean;
            alias: string;
        };
    };
}
export interface IPostcssSugarPluginRatioParams {
    ratio: number;
}
export { postcssSugarPluginRatioInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginRatioParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
