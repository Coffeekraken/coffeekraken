import __SInterface from '@coffeekraken/s-interface';

export default class SHighlightJsComponentInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                successTimeout: {
                    type: 'Number',
                    default: 1500,
                },
                errorTimeout: {
                    type: 'Number',
                    default: 3000,
                },
            })
        );
    }
}
