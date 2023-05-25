import __SInterface from '@coffeekraken/s-interface';

export default class SDocComponentInterface extends __SInterface {
    static get _definition(): {
        endpoints: {
            type: string;
            description: string;
            default: any;
        };
        i18n: {
            type: string;
            description: string;
            default: {
                examplesTitle: string;
                paramsTitle: string;
                settingsTitle: string;
                search: string;
            };
        };
    };
}
