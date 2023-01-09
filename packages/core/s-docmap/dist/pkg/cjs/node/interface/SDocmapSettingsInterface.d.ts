import __SInterface from '@coffeekraken/s-interface';

declare class SDocmapSettingsInterface extends __SInterface {
    static get _definition(): {
        customMenu: {
            description: string;
            type: string;
            default: {};
        };
        tagsProxy: {
            description: string;
            type: string;
            default: {};
        };
    };
}
export default SDocmapSettingsInterface;
