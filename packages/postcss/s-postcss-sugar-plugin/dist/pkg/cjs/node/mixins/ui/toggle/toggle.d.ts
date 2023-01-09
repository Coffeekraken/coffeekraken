import __SInterface from '@coffeekraken/s-interface';

declare class postcssSugarPluginUiBadgeInterface extends __SInterface {
    static get _definition(): {
        type: {
            type: string;
            values: string[];
            required: boolean;
        };
    };
}
export interface IPostcssSugarPluginUiBadgeParams {
    type: 'burger';
}
export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
