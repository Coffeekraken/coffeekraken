import __SInterface from '@coffeekraken/s-interface';

export default class SFileSettingsInterface extends __SInterface {
    static get _definition(): {
        checkExistence: {
            description: string;
            type: string;
            default: boolean;
        };
        cwd: {
            description: string;
            type: string;
            default: any;
        };
        shrinkSizeTo: {
            description: string;
            type: string;
            default: number;
        };
        watch: {
            description: string;
            type: string;
            default: boolean;
        };
        writeSettings: {
            description: string;
            type: string;
            default: {
                encoding: string;
                flag: any;
                mode: number;
                cast: boolean;
                path: any;
            };
        };
        readSettings: {
            description: string;
            type: string;
            default: {
                encoding: string;
                flag: any;
                cast: boolean;
            };
        };
        processors: {
            description: string;
            type: string;
            default: {
                content: any[];
                save: any[];
            };
        };
    };
}
