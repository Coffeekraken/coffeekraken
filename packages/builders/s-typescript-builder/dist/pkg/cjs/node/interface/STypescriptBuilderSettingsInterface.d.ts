import __SInterface from '@coffeekraken/s-interface';

export default class STypescriptBuilderSettingsInterface extends __SInterface {
    static get _definition(): {
        log: {
            type: string;
            description: string;
            default: {
                summary: boolean;
                compile: boolean;
            };
        };
    };
}
