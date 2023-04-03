import __SInterface from '@coffeekraken/s-interface';

declare class SColorSettingsInterface extends __SInterface {
    static get _definition(): {
        format: {
            description: string;
            type: string;
            values: string[];
            default: string;
        };
    };
}
export default SColorSettingsInterface;
