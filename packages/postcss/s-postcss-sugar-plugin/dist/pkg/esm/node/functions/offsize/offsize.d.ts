import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginOffsizeFunctionInterface extends __SInterface {
    static get _definition(): {
        offsize: {
            type: string;
            values: string[];
            default: string;
            required: boolean;
        };
        scalable: {
            type: string;
            default: any;
        };
    };
}
export { postcssSugarPluginOffsizeFunctionInterface as interface };
export interface IPostcssSugarPluginOffsizeFunctionParams {
    offsize: string;
    scalable: boolean;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginOffsizeFunctionParams>;
}): string;
