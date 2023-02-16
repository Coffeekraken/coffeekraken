import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SRefocusFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SRefocusFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SRefocusFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            trigger: {
                description:
                    'Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['event:eventName', 'anchor', 'history'],
                default: [],
            },
            timeout: {
                description:
                    'Specify a timeout to wait before refocus the element',
                type: 'Number',
                default: 500,
            },
            duration: {
                description: 'Specify the duration of the refocus animation',
                type: 'Number',
            },
            easing: {
                description:
                    'Specify the easing function of the refocus animation',
                type: 'Function',
            },
            focusedClass: {
                description:
                    'Specify the class to add when the target element has been focused',
                type: 'String|Boolean',
                default: 'focused',
            },
            focusedClassDuration: {
                description:
                    'Specify how many ms the focused class has to be added, then removed',
                type: 'Number',
                default: 1000,
            },
            // minToScroll: {
            //     description:
            //         'Specify a minimum scroll distance to make the browser actually scroll',
            //     type: 'Number',
            //     default: 200,
            // },
            offset: {
                description:
                    'Specify the offset of the refocus animation in px',
                type: 'Number',
            },
            offsetX: {
                description:
                    'Specify the offset x of the refocus animation in px',
                type: 'Number',
            },
            offsetY: {
                description:
                    'Specify the offset y of the refocus animation in px',
                type: 'Number',
            },
            align: {
                description: 'Specify the alignment of the refocus animation',
                type: 'String',
                values: ['start', 'center', 'end'],
            },
            justify: {
                description:
                    'Specify the justification of the refocus animation',
                type: 'String',
                values: ['start', 'center', 'end'],
            },
        };
    }
}
