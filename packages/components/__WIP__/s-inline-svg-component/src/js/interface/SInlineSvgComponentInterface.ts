import __SInterface from '@coffeekraken/s-interface';

export default class SDocblockToHtmlComponentInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                src: {
                    type: 'String',
                    required: true,
                    alias: 's',
                },
            })
        );
    }
}
