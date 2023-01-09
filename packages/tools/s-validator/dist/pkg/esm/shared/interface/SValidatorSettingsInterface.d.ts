import __SInterface from '@coffeekraken/s-interface';

export default class SValidatorSettingsInterface extends __SInterface {
    static get _definition(): {
        i18n: {
            description: string;
            type: string;
            default: {};
        };
    };
}
