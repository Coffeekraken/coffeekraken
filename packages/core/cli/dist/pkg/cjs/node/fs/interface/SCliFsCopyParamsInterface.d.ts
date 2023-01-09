import __SInterface from '@coffeekraken/s-interface';

export default class SCliFsCopyParamsInterface extends __SInterface {
    static get _definition(): {
        src: {
            description: string;
            type: string;
            required: boolean;
        };
        glob: {
            description: string;
            type: string;
        };
        dest: {
            description: string;
            type: string;
            required: boolean;
        };
        chdir: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
