import __SInterface from '@coffeekraken/s-interface';

export default class SCliNvmAutoSwitchParamsInterface extends __SInterface {
    static get _definition(): {
        install: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        uinstall: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
    };
}
