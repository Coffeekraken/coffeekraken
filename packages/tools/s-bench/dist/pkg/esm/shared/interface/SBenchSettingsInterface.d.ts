import __SInterface from '@coffeekraken/s-interface';

export default class SBenchSettingsInterface extends __SInterface {
    static get _definition(): {
        title: {
            description: string;
            type: string;
        };
        body: {
            description: string;
            type: string;
        };
    };
}
