import __SInterface from '@coffeekraken/s-interface';

export default class SColorPickerComponentInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                description: 'Specify the initial value for your picker',
                type: 'String',
                default: '#ff0000',
            },
            theme: {
                description:
                    'Specify the theme you want to use for this picker',
                type: 'String',
                values: ['nano', 'monolith'],
                default: 'nano',
            },
            swatches: {
                description: 'Specify some colors you want in your swatches',
                type: 'Array<String>',
                default: [],
            },
        };
    }
}
