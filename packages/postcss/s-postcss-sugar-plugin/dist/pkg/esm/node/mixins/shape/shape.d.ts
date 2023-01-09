import __SInterface from '@coffeekraken/s-interface';

declare class PostcssSugarPluginShapeInterface extends __SInterface {
    static get _definition(): {
        shape: {
            type: string;
            description: string;
            values: string[];
        };
    };
}
export interface IPostcssSugarPluginShapeParams {
    shape: 'square' | 'pill' | 'default';
}
export { PostcssSugarPluginShapeInterface as interface };
export default function ({ params, atRule, replaceWith, }: {
    params: Partial<IPostcssSugarPluginShapeParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
