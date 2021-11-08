import __SInterface from '@coffeekraken/s-interface';

export default class SActivateFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            href: {
                type: 'String',
                default: '',
            },
            group: {
                type: 'String',
            },
            toggle: {
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            history: {
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            active: {
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
                physical: true,
            },
            activeClass: {
                type: 'String',
                description:
                    'Specify the class to apply on target(s) when activate',
                default: 'active',
            },
            activeAttribute: {
                type: 'String',
                description:
                    'Specify the attribute to apply on target(s) when activate',
                default: 'active',
            },
            saveState: {
                type: 'Boolean',
                default: false,
            },
            activateTimeout: {
                type: 'Number',
                default: 0,
            },
            unactivateTimeout: {
                type: 'Number',
                default: 0,
            },
            trigger: {
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                default: ['click'],
            },
        };
    }
}
