import __SInterface from '@coffeekraken/s-interface';

export default class SMonorepoPublishParamsInterface extends __SInterface {
    static get _definition(): {
        packagesGlob: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        yes: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
