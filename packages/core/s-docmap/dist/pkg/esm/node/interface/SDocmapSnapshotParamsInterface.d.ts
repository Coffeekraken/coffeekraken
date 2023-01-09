import __SInterface from '@coffeekraken/s-interface';

declare class SDocmapSnapshotParamsInterface extends __SInterface {
    static get _definition(): {
        outDir: {
            description: string;
            type: string;
            path: {
                absolute: boolean;
                tokens: boolean;
            };
            default: any;
        };
    };
}
export default SDocmapSnapshotParamsInterface;
