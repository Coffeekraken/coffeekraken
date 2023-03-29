import __SInterface from '@coffeekraken/s-interface';

declare class SI18nExtractParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
        outDir: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
        fileName: {
            type: string;
            description: string;
            default: any;
            required: boolean;
        };
    };
}
export default SI18nExtractParamsInterface;
