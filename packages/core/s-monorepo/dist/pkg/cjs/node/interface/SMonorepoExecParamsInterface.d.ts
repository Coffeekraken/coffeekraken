import __SInterface from '@coffeekraken/s-interface';

export default class SMonorepoExecParamsInterface extends __SInterface {
    static get _definition(): {
        command: {
            description: string;
            type: string;
            required: boolean;
        };
        packagesGlob: {
            description: string;
            type: string;
            default: any;
        };
    };
}
