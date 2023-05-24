import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginWireframeBorderFunctionInterface extends __SInterface {
    static get _definition(): {
        variant: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export { postcssSugarPluginWireframeBorderFunctionInterface as interface };
export interface IPostcssSugarPluginWireframeBorderFunctionParams {
    variant: 'light' | 'dark';
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginWireframeBorderFunctionParams>;
}): any;
