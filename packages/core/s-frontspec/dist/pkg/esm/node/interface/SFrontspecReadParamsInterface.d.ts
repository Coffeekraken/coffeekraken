import __SInterface from '@coffeekraken/s-interface';

declare class SFrontspecReadParamsInterface extends __SInterface {
    static get _definition(): {
        env: {
            description: string;
            type: string;
            default: any;
        };
    };
}
export default SFrontspecReadParamsInterface;
