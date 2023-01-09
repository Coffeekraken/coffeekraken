import __SInterface from '@coffeekraken/s-interface';

declare class SFrontspecBuildParamsInterface extends __SInterface {
    static get _definition(): {
        sources: {
            type: string;
            description: string;
            default: any;
        };
    };
}
export default SFrontspecBuildParamsInterface;
