import __SInterface from '@coffeekraken/s-interface';

declare class SCarpenterStartParamsInterface extends __SInterface {
    static get _definition(): {
        port: {
            type: string;
            description: string;
            default: any;
        };
    };
}
export default SCarpenterStartParamsInterface;
