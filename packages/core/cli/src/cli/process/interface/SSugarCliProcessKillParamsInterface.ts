import __SInterface from '@coffeekraken/s-interface';

export default class SSugarCliProcessKillParamsInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                id: {
                    type: 'Number',
                    alias: 'i',
                },
                port: {
                    type: 'Number',
                    alias: 'p',
                },
            })
        );
    }
}
