import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition(): {
        frequency: {
            type: string;
            required: boolean;
            default: number;
        };
        width: {
            type: string;
            required: boolean;
            default: string;
        };
        height: {
            type: string;
            required: boolean;
            default: string;
        };
    };
}
export interface IPostcssSugarPluginDisabledParams {
    frequency: number;
    width: string;
    height: string;
}
export { postcssSugarPluginDisabledInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginDisabledParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
