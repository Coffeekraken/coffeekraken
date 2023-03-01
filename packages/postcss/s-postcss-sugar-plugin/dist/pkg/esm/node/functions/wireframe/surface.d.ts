import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginWireframeSurfaceFunctionInterface extends __SInterface {
    static get _definition(): {
        variant: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export { postcssSugarPluginWireframeSurfaceFunctionInterface as interface };
export interface IPostcssSugarPluginWireframeSurfaceFunctionParams {
    variant: 'light' | 'dark';
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginWireframeSurfaceFunctionParams>;
}): any;
