import __SInterface from '@coffeekraken/s-interface';

declare class SDocmapReadParamsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        dependencies: {
            description: string;
            type: string;
            default: boolean;
        };
        sort: {
            description: string;
            type: string;
            default: any;
        };
        sortDeep: {
            description: string;
            type: string;
            default: any;
        };
    };
}
export default SDocmapReadParamsInterface;
