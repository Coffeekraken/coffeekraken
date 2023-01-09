import __SInterface from '@coffeekraken/s-interface';

export default class SFrontendServerCorsProxyParamsInterface extends __SInterface {
    static get _definition(): {
        port: {
            description: string;
            type: string;
            default: any;
        };
        targetUrlHeaderName: {
            description: string;
            type: string;
            default: any;
        };
        limit: {
            description: string;
            type: string;
            default: any;
        };
    };
}
