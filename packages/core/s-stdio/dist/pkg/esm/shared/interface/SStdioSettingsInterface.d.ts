import __SInterface from '@coffeekraken/s-interface';

export default class SStdioSettingsInterface extends __SInterface {
    static get _definition(): {
        filter: {
            description: string;
            type: string;
        };
        processor: {
            description: string;
            type: string;
        };
        defaultLogObj: {
            description: string;
            type: string;
            default: {};
        };
        defaultAskObj: {
            description: string;
            type: string;
            default: {};
        };
    };
}
