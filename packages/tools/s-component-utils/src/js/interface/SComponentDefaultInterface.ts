import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SComponentDefaultInterface
 * @namespace           js.interface
 * @type.                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SComponentDefaultInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
                physical: true,
            },
            mounted: {
                type: 'Boolean',
                default: false,
                physical: true,
            },
            mountWhen: {
                type: 'String',
                values: ['directly', 'direct', 'inViewport'],
                default: 'direct',
            },
            adoptStyle: {
                type: 'Boolean',
                default: true,
                physical: true,
            },
            bare: {
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}