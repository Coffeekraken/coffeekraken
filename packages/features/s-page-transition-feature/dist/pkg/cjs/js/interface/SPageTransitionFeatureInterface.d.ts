import __SInterface from '@coffeekraken/s-interface';

export default class SPageTransitionFeatureInterface extends __SInterface {
    static get _definition(): {
        patchBody: {
            description: string;
            type: string;
            default: boolean;
        };
        scroll: {
            description: string;
            type: string;
            default: boolean;
        };
        before: {
            description: string;
            type: string;
        };
        after: {
            description: string;
            type: string;
        };
        autoStyle: {
            description: string;
            type: string;
            default: boolean;
        };
        injectBrokenLinkIcon: {
            description: string;
            type: string;
            default: boolean;
        };
        brokenLinkIcon: {
            description: string;
            type: string;
            default: string;
        };
        ga: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
