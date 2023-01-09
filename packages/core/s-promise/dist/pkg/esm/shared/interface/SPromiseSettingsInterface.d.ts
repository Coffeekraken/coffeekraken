import __SInterface from '@coffeekraken/s-interface';

export default class SPromiseSettingsInterface extends __SInterface {
    static get _definition(): {
        treatCancelAs: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
        destroyTimeout: {
            description: string;
            type: string;
            default: number;
        };
        preventRejectOnThrow: {
            description: string;
            type: string;
            default: boolean;
        };
        emitLogErrorEventOnThrow: {
            description: string;
            type: string;
            default: boolean;
        };
        resolveAtResolveEvent: {
            description: string;
            type: string;
            default: boolean;
        };
        rejectAtRejectEvent: {
            description: string;
            type: string;
            default: boolean;
        };
        resolveProxies: {
            description: string;
            type: string;
            default: any[];
        };
        rejectProxies: {
            description: string;
            type: string;
            default: any[];
        };
    };
}
