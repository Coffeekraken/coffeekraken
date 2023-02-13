import __SInterface from '@coffeekraken/s-interface';
import { triggers } from '@coffeekraken/sugar/js/dom/detect/when';

/**
 * @name                SComponentUtilsDefaultPropsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of a basic SComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SComponentUtilsDefaultPropsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                description: 'Specify an id for your component',
                type: 'String',
                physical: true,
            },
            // status: {
            //     description:
            //         'Specify the status of the component. Can be "pending", "mounting" or "mounted"',
            //     type: 'String',
            //     values: ['pending', 'mounting', 'mounted'],
            //     default: 'pending',
            //     physical: true,
            // },
            mountWhen: {
                description: 'Specify when your component will be mounted',
                type: 'String',
                values: triggers,
                default: 'direct',
            },
            activeWhen: {
                description:
                    'Specify when your component is active and when it is not',
                type: 'String[]',
                values: ['inViewport', 'lod'],
                default: ['inViewport', 'lod'],
            },
            lod: {
                description:
                    'Specify the minimum lod (level of details) from when this component is active',
                type: 'Number',
            },
            adoptStyle: {
                description:
                    'Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element',
                type: 'Boolean',
                default: true,
                // physical: true,
            },
            saveState: {
                description:
                    'Specify if you want to save the state of your component',
                type: 'Boolean',
                default: false,
            },
            lnf: {
                description:
                    'Specify the lnf (look-and-feel) of your component. This is used by the css to style your component',
                type: 'String',
                default: 'default',
                physical: true,
            },
            bare: {
                description:
                    'Specify if you want your component with only the bare styling. It just add the "s-bare" class on the component itself',
                type: 'Boolean',
                default: false,
            },
            responsive: {
                description:
                    'Specify some responsive properties. A "media" property is required and has to be either a media query, or a media query name defined in the config.themeMedia.queries theme setting',
                type: 'Object',
                default: {},
            },
            prefixEvent: {
                description:
                    'Specify if you want the emitted events to be prefixed by the name of the feature/component like "s-slider.change" or not',
                type: 'Boolean',
                default: true,
            },
            verbose: {
                description:
                    'Specify if you want this component/feature to log informations about activity or not',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
