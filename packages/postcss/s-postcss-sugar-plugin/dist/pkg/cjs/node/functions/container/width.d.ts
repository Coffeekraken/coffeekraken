import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginContainerMaxWidthInterface extends __SInterface {
    static get _definition(): {
        type: {
            type: string;
            alias: string;
        };
    };
}
export { postcssSugarPluginContainerMaxWidthInterface as interface };
export interface IPostcssSugarPluginContainerMaxWidthParams {
    type: string;
}
export default function width({ params, }: {
    params: Partial<IPostcssSugarPluginContainerMaxWidthParams>;
}): string;
