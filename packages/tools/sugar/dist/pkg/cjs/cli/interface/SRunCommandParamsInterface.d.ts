import __SInterface from '@coffeekraken/s-interface';

export default class SRunCommandParamsInterface extends __SInterface {
    static get _definition(): {
        command: {
            type: string;
            description: string;
            alias: string;
        };
        directory: {
            type: string;
            description: string;
            alias: string;
        };
        verbose: {
            type: string;
            description: string;
            default: boolean;
            alias: string;
        };
    };
}
