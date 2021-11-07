import __SInterface from '@coffeekraken/s-interface';

export default class SColorPickerComponentInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                value: {
                    type: 'String',
                    default: '#ff0000',
                },
            })
        );
    }
}
