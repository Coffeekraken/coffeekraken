import __SInterface from '@coffeekraken/s-interface';

declare class SCarpenterStartParamsInterface extends __SInterface {
    static get _definition(): {
        port: {
            type: string;
            description: string;
            default: any;
            alias: string;
        };
        vitePort: {
            type: string;
            description: string;
            default: any;
        };
        cssPath: {
            type: string;
            description: string;
            required: boolean;
            default: string;
        };
        jsPath: {
            type: string;
            description: string;
            required: boolean;
            default: string;
        };
        dev: {
            type: string;
            description: string;
            default: boolean;
        };
    };
}
export default SCarpenterStartParamsInterface;
