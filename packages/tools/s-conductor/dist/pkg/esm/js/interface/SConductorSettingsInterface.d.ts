import __SInterface from '@coffeekraken/s-interface';

export default class SConductorSettingsInterface extends __SInterface {
    static get _definition(): {
        idleTimeout: {
            description: string;
            type: string;
            default: number;
        };
        logTimeout: {
            description: string;
            type: string;
            default: number;
        };
        log: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
