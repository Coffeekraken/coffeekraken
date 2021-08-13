import __SInterface from '@coffeekraken/s-interface';

export default class SDatePickerComponentInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            required: true,
        },
        format: {
            type: 'String',
            default: 'format',
        },
    };
}
