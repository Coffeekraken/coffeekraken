import __SInterface from '@coffeekraken/s-interface';

export default class SDocComponentInterface extends __SInterface {
    static get _definition(): {
        endpoints: {
            type: string;
            description: string;
            default: any;
        };
        loaderSvg: {
            type: string;
            description: string;
            default: string;
        };
        features: {
            type: string;
            description: string;
            default: {
                fullscreen: boolean;
            };
        };
        icons: {
            type: string;
            description: string;
            default: {
                file: string;
                enterFullscreen: string;
                exitFullscreen: string;
            };
        };
        i18n: {
            type: string;
            description: string;
            default: {
                examplesTitle: string;
                paramsTitle: string;
                settingsTitle: string;
                search: string;
                toggleFullscreen: string;
            };
        };
    };
}
