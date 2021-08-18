import __SInterface from '@coffeekraken/s-interface';

export default class SColorPickerComponentInterface extends __SInterface {
    static definition = {
        value: {
            type: 'String',
            default: '#ff0000',
        },
    };
}
