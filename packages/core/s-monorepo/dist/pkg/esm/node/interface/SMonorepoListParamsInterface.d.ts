import __SInterface from '@coffeekraken/s-interface';

export default class SMonorepoListParamsInterface extends __SInterface {
    static get _definition(): {
        packagesGlob: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        asJson: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        publish: {
            description: string;
            type: string;
            alias: string;
        };
        independent: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
