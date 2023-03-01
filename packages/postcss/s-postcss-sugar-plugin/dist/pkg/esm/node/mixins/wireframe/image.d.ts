import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginWireframeImageMixinInterface extends __SInterface {
    static get _definition(): {
        type: {
            type: string;
            values: string[];
            description: string;
            default: string;
        };
    };
}
export { postcssSugarPluginWireframeImageMixinInterface as interface };
export interface postcssSugarPluginWireframeImageMixinParams {
    type: 'image' | 'map';
}

export default function ({ params, atRule, replaceWith, }: {
    params: Partial<postcssSugarPluginWireframeImageMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
