import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginWireframeBackgroundFunctionInterface extends __SInterface {
    static get _definition(): {
        variant: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export { postcssSugarPluginWireframeBackgroundFunctionInterface as interface };
export interface IPostcssSugarPluginWireframeBackgroundFunctionParams {
    variant: 'light' | 'dark';
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginWireframeBackgroundFunctionParams>;
}): any;
