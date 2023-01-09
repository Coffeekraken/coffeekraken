import __SInterface from '@coffeekraken/s-interface';

export default class SCodeFormatterFormatParamsInterface extends __SInterface {
    static get _definition(): {
        glob: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        inDir: {
            description: string;
            type: string;
            default: any;
            alias: string;
        };
        watch: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        formatInitial: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
