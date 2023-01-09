import __SInterface from '@coffeekraken/s-interface';

export default class SSitemapBuilderSettingsInterface extends __SInterface {
    static get _definition(): {
        sources: {
            description: string;
            type: string;
            default: {};
        };
    };
}
