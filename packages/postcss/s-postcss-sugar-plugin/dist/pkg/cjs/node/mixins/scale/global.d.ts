import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginScaleGlobalMixinInterface extends __SInterface {
    static get _definition(): {
        value: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginScaleGlobalMixinInterface as interface };
export interface IPostcssSugarPluginScaleGlobalMixinParams {
    value: string | number;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginScaleGlobalMixinParams>;
}): string;
