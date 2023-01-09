import __SInterface from '@coffeekraken/s-interface';

export default class SThemeSwitcherComponentInterface extends __SInterface {
    static get _definition(): {
        darkModeicon: {
            description: string;
            type: string;
            default: boolean;
        };
        darkModeIconClass: {
            description: string;
            type: string;
            default: string;
        };
    };
}
