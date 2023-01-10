import __SInterface from '@coffeekraken/s-interface';

declare class SDocmapReadParamsInterface extends __SInterface {
    static get _definition(): {
        slug: {
            description: string;
            type: string;
            alias: string;
        };
        namespace: {
            description: string;
            type: string;
            alias: string;
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
