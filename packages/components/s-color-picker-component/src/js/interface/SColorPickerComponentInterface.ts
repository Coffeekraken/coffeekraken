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
            noPreview: {
                description: 'Specify if you want to hide the preview',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            position: {
                description:
                    'Specify the position of the picker. Can be "top" or "bottom"',
                type: 'String',
                values: ['top', 'bottom'],
                default: 'bottom',
            },
            swatches: {
                description: 'Specify some colors you want in your swatches',
                type: 'Array<String>',
                default: [],
            },
        };
    }
}
