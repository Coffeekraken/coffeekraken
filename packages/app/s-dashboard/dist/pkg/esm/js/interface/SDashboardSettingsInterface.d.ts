import __SInterface from '@coffeekraken/s-interface';

declare class SDashboardSettingsInterface extends __SInterface {
    static get _definition(): {
        layout: {
            description: string;
            type: string;
            default: any;
        };
    };
}
export default SDashboardSettingsInterface;
