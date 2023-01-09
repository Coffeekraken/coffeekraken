import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginDepthInterface extends __SInterface {
    static get _definition(): {
        depth: {
            type: string;
            required: boolean;
            alias: string;
        };
        type: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export interface IPostcssSugarPluginDepthParams {
    depth: string | number;
    type: 'box' | 'text';
}
export { postcssSugarPluginDepthInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginDepthParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
