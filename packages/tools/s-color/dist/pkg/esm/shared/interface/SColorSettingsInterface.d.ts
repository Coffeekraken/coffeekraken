import __SInterface from '@coffeekraken/s-interface';

declare class SColorSettingsInterface extends __SInterface {
    static get _definition(): {
        returnNewInstance: {
            description: string;
            type: string;
            default: boolean;
        };
        defaultFormat: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
    };
}
export default SColorSettingsInterface;
