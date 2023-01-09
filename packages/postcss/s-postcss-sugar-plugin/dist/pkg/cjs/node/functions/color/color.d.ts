import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginColorInterface extends __SInterface {
    static get _definition(): {
        color: {
            type: string;
            alias: string;
        };
        schema: {
            type: string;
            alias: string;
        };
        modifier: {
            type: string;
            alias: string;
        };
    };
}
export { postcssSugarPluginColorInterface as interface };
export interface IPostcssSugarPluginColorParams {
    name: string;
    schema: string;
    modifier: string;
}
export default function color({ params, }: {
    params: Partial<IPostcssSugarPluginColorParams>;
}): any;
