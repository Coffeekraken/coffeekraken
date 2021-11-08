import __SInterface from '@coffeekraken/s-interface';

export default class SSugarCliProcessKillParamsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'Number',
                alias: 'i',
            },
            port: {
                type: 'Number',
                alias: 'p',
            },
        };
    }
}
