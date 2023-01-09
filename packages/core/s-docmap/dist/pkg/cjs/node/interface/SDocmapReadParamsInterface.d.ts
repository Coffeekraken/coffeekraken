import __SInterface from '@coffeekraken/s-interface';

declare class SDocmapReadParamsInterface extends __SInterface {
    static get _definition(): {
        input: {
            description: string;
            type: string;
            default: any;
            alias: string;
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
        excludePackages: {
            type: {
                type: string;
                splitChars: string[];
            };
            description: string;
            default: any;
        };
    };
}
export default SDocmapReadParamsInterface;
