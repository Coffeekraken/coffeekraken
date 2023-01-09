import __SInterface from '@coffeekraken/s-interface';

declare class SColorApplyParamsInterface extends __SInterface {
    static get _definition(): {
        desaturate: {
            type: string;
            default: number;
            alias: string;
            description: string;
        };
        saturate: {
            type: string;
            default: number;
            alias: string;
            description: string;
        };
        greyscale: {
            type: string;
            default: boolean;
            alias: string;
            description: string;
        };
        spin: {
            type: string;
            default: number;
            description: string;
        };
        transparentize: {
            type: string;
            default: number;
            description: string;
        };
        alpha: {
            type: string;
            default: number;
            alias: string;
            description: string;
        };
        opacity: {
            type: string;
            default: number;
            alias: string;
            description: string;
        };
        opacify: {
            type: string;
            default: number;
            description: string;
        };
        darken: {
            type: string;
            default: number;
            description: string;
        };
        lighten: {
            type: string;
            default: number;
            alias: string;
            description: string;
        };
        invert: {
            type: string;
            default: boolean;
            alias: string;
            description: string;
        };
    };
}
export default SColorApplyParamsInterface;
