import __SInterface from '@coffeekraken/s-interface';
declare class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition(): {
        query1: {
            type: string;
            required: boolean;
        };
        query2: {
            type: string;
        };
        query3: {
            type: string;
        };
        query4: {
            type: string;
        };
        query5: {
            type: string;
        };
        query6: {
            type: string;
        };
        query7: {
            type: string;
        };
    };
}
export { postcssSugarPluginMediaMixinInterface as interface };

export default function ({ params, atRule, postcssApi, registerPostProcessor, }: {
    params: any;
    atRule: any;
    postcssApi: any;
    registerPostProcessor: Function;
}): void;
