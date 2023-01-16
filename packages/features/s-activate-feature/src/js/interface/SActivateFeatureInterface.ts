import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SActivateFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SActivateFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

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
            triggerer: {
                description:
                    'Specify an element selector that will be used as the triggerer instead of this current element',
                type: 'String',
            },
            trigger: {
                description:
                    'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" ,"anchor", "event:%eventName" "and/or" "cookie:%cookieName.%optionalDotPath". When using the "event:", the listener will be the node itself by default but you can specify the "document" like so "event:%eventName:document". When using "cookie", you can negate the assertion like so "!cookie:myCookie.myValue"',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
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
            unactivateOn: {
                description:
                    'Specify some event(s) catched on the body tag that will unactivate the target(s)',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
            },
        };
    }
}
