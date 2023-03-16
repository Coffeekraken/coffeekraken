import __SInterface from '@coffeekraken/s-interface';

declare class SViteStartParamsInterface extends __SInterface {
    static get _definition(): {
        host: {
            type: string;
            description: string;
            required: boolean;
            default: any;
            alias: string;
        };
        port: {
            type: string;
            description: string;
            required: boolean;
            default: any;
            alias: string;
        };
    };
}
export default SViteStartParamsInterface;
