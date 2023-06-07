import __SInterface from '@coffeekraken/s-interface';

declare class SSugarConfigReadParamsInterface extends __SInterface {
    static get _definition(): {
        path: {
            description: string;
            type: string;
            default: string;
            alias: string;
        };
    };
}
export default SSugarConfigReadParamsInterface;
