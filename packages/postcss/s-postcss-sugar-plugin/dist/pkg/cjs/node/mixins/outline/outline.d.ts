import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
    static get _definition(): {
        where: {
            type: string;
            values: string[];
            default: string;
        };
    };
}
export { postcssSugarPluginStateOutlineMixinInterface as interface };
export interface postcssSugarPluginStateOutlineMixinParams {
    where: 'after' | 'before' | 'element';
}

export default function ({ params, atRule, replaceWith, }: {
    params: Partial<postcssSugarPluginStateOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
