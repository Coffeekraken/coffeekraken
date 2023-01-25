import __SInterface from '@coffeekraken/s-interface';

export default class SFrontendServerStartParamsInterface extends __SInterface {
    static get _definition(): {
        hostname: {
            description: string;
            type: string;
            alias: string;
            required: boolean;
            default: any;
        };
        port: {
            description: string;
            type: string;
            alias: string;
            default: any;
        };
        listen: {
            description: string;
            type: string;
            alias: string;
            default: boolean;
        };
        rootDir: {
            description: string;
            type: string;
            default: any;
        };
        viewsDir: {
            description: string;
            type: string;
            default: any;
        };
        pagesDir: {
            description: string;
            type: string;
            default: any;
        };
        logLevel: {
            description: string;
            type: string;
            values: string[];
            default: any;
        };
        target: {
            description: string;
            values: string[];
            alias: string;
            default: any;
        };
    };
}
