import __SInterface from '@coffeekraken/s-interface';

export default class WhenInteractSettingsInterface extends __SInterface {
    static get _definition(): {
        pointerover: {
            description: string;
            type: string;
            default: boolean;
        };
        pointerout: {
            description: string;
            type: string;
            default: boolean;
        };
        click: {
            description: string;
            type: string;
            default: boolean;
        };
        touchstart: {
            description: string;
            type: string;
            default: boolean;
        };
        touchend: {
            description: string;
            type: string;
            default: boolean;
        };
        focus: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
