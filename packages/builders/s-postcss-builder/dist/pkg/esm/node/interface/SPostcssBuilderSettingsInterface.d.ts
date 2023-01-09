import __SInterface from '@coffeekraken/s-interface';

export default class SPostcssBuilderSettingsInterface extends __SInterface {
    static get _definition(): {
        postcss: {
            description: string;
            type: string;
            default: any;
        };
        purgecss: {
            description: string;
            type: string;
            default: any;
        };
    };
}
