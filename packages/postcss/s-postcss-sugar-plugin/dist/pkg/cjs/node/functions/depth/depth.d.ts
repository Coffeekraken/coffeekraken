import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginDepthFunctionInterface extends __SInterface {
    static get _definition(): {
        depth: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginDepthFunctionInterface as interface };
export interface IPostcssSugarPluginDepthFunctionParams {
    depth: string;
}
export default function depth({ params, }: {
    params: Partial<IPostcssSugarPluginDepthFunctionParams>;
}): any;
