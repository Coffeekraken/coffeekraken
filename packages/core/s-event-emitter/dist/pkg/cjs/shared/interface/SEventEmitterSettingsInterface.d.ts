import __SInterface from '@coffeekraken/s-interface';

export default class SEventEmitterSettingsInterface extends __SInterface {
    static get _definition(): {
        asyncStart: {
            description: string;
            type: string;
            default: boolean;
        };
        bufferTimeout: {
            description: string;
            type: string;
            default: number;
        };
        defaults: {
            description: string;
            type: string;
            default: {};
        };
        castByEvent: {
            description: string;
            type: string;
            default: {
                log: any;
            };
        };
        bind: {
            description: string;
            type: string;
        };
    };
}
