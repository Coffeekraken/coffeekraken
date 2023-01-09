import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition(): {
        theme: {
            type: string;
            default: any;
        };
        variant: {
            type: string;
            default: any;
        };
    };
}
export { postcssSugarPluginMediaMixinInterface as interface };

export default function ({ params, atRule, replaceWith, }: {
    params: any;
    atRule: any;
    replaceWith: Function;
}): void;
