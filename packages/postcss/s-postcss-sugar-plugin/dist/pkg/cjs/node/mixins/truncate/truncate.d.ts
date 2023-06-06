import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginRatioInterface extends __SInterface {
    static get _definition(): {
        lines: {
            type: string;
            required: boolean;
            default: number;
        };
    };
}
export interface IPostcssSugarPluginRatioParams {
    lines: number;
}
export { postcssSugarPluginRatioInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginRatioParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
