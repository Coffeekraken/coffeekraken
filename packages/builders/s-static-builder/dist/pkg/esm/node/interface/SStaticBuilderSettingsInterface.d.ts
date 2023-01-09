import __SInterface from '@coffeekraken/s-interface';

export default class SStaticBuilderSettingsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            required: boolean;
            alias: string;
            default: any;
        };
    };
}
