import __SInterface from '@coffeekraken/s-interface';

export default class SCommandProcessInterface extends __SInterface {
    static get _definition(): {
        command: {
            description: string;
            type: string;
            alias: string;
            required: boolean;
        };
    };
}
