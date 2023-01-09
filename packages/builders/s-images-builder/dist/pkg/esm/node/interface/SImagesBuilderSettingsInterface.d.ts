import __SInterface from '@coffeekraken/s-interface';

export default class SImagesBuilderSettingsInterface extends __SInterface {
    static get _definition(): {
        resolveGlob: {
            description: string;
            type: string;
            default: {};
        };
    };
}
