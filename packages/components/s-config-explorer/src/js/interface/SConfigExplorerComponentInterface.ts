import __SInterface from '@coffeekraken/s-interface';

export default class SConfigExplorerComponentInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                apiUrl: {
                    type: 'String',
                    default: 'api/config',
                },
                maxItems: {
                    type: 'Number',
                    default: 30,
                },
            })
        );
    }
}
