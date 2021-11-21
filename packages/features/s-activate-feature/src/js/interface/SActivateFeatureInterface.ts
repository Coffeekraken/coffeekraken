import __SInterface from '@coffeekraken/s-interface';

export default class SActivateFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            href: {
                description:
                    'Specify the target element(s) to activate/unactivate',
                type: 'String',
                default: '',
            },
            group: {
                description:
                    'Specify a group id for your element. This is used for things like tabs, etc...',
                type: 'String',
            },
            toggle: {
                description:
                    'Specify if you want to be able to click on the same element to activate/unactivate it.',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            history: {
                description:
                    'Specify if you want to store and react to history hash changes',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            active: {
                description: 'Specify the initial state of your element',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
                physical: true,
            },
            activeClass: {
                description:
                    'Specify the class applied on target(s) when active. Default is "active"',
                type: 'String',
                default: 'active',
            },
            activeAttribute: {
                description:
                    'Specify the attribute name applied on target(s) when active.',
                type: 'String',
                default: 'active',
            },
            saveState: {
                description:
                    'Specify if you want to save state in localStorage to restore it on page reload, etc...',
                type: 'Boolean',
                default: false,
            },
            activateTimeout: {
                description:
                    'Specify a timeout before actiavting the target(s)',
                type: 'Number',
                default: 0,
            },
            unactivateTimeout: {
                description:
                    'Specify a timeout before unactivate the target(s)',
                type: 'Number',
                default: 0,
            },
            trigger: {
                description:
                    'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" and/or "anchor"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'click',
                    'mouseover',
                    'mouseenter',
                    'mouseout',
                    'mouseleave',
                    'anchor',
                ],
                default: ['click'],
            },
        };
    }
}
