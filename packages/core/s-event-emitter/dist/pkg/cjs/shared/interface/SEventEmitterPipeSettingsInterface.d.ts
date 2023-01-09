import __SInterface from '@coffeekraken/s-interface';

export default class SEventEmitterPipeSettingsInterface extends __SInterface {
    static get _definition(): {
        events: {
            description: string;
            type: string;
            default: string;
        };
        overrideEmitter: {
            description: string;
            type: string;
            default: boolean;
        };
        processor: {
            description: string;
            type: string;
        };
        exclude: {
            description: string;
            type: string;
            default: string[];
        };
        filter: {
            description: string;
            type: string;
        };
    };
}
