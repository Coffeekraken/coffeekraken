import __SInterface from '@coffeekraken/s-interface';

export default class SCliConfigCacheParamsInterface extends __SInterface {
    static get _definition(): {
        id: {
            description: string;
            type: string;
            default: string;
        };
        cacheDir: {
            description: string;
            type: string;
            default: any;
        };
    };
}
