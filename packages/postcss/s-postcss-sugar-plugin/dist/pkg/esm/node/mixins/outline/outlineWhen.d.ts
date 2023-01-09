import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
    static get _definition(): {
        when: {
            type: string;
            values: string[];
            default: string[];
        };
    };
}
export { postcssSugarPluginStateOutlineWhenMixinInterface as interface };
export interface postcssSugarPluginStateOutlineWhenMixinParams {
    when: ('hover' | 'focus' | 'always')[];
}

export default function ({ params, atRule, replaceWith, }: {
    params: Partial<postcssSugarPluginStateOutlineWhenMixinParams>;
    atRule: any;
    replaceWith: Function;
}): string[];
