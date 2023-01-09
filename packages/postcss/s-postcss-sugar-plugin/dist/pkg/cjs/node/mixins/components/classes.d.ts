import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginComponentsClassesInterface extends __SInterface {
    static get _definition(): {
        scope: {
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
export { postcssSugarPluginComponentsClassesInterface as interface };

export default function ({ params, atRule, replaceWith, }: {
    params: any;
    atRule: any;
    replaceWith: Function;
}): void;
