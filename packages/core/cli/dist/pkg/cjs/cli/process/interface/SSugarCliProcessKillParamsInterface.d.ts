import __SInterface from '@coffeekraken/s-interface';

export default class SSugarCliProcessKillParamsInterface extends __SInterface {
    static get _definition(): {
        id: {
            description: string;
            type: string;
            alias: string;
        };
        port: {
            description: string;
            type: string;
            alias: string;
        };
    };
}
