import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginScaleMixinInterface extends __SInterface {
    static get _definition(): {
        value: {
            type: string;
            required: boolean;
        };
    };
}
export { postcssSugarPluginScaleMixinInterface as interface };
export interface IPostcssSugarPluginScaleMixinParams {
    value: string | number;
}
export default function ({ params, }: {
    params: Partial<IPostcssSugarPluginScaleMixinParams>;
}): string;
