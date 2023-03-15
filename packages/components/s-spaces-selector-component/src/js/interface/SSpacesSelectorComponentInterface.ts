import __SFrontspec from '@coffeekraken/s-frontspec';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSpacesSelectorComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSpacesSelectorComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SSpacesSelectorComponentInterface extends __SInterface {
    static get _definition() {
        return {
            spaces: {
                type: 'Object',
                description:
                    'Specify the spaces you want as options. This object MUST contain two properties which are "margin" and "padding", which contains each every options you want as an object with "name" and "value" properties',
                required: true,
                get default() {
                    return {
                        margin: __SFrontspec.get('margin') ?? {},
                        padding: __SFrontspec.get('padding') ?? {},
                    };
                },
            },
            values: {
                type: 'Object',
                description:
                    'Specify the initial values for the selectors. MUST be an object with properties "paddingTop", "paddingLeft", "marginBottom", etc...',
                default: {},
            },
            valueProp: {
                type: 'String',
                description:
                    'Specify the space object propery to take as value',
                default: 'value',
            },
        };
    }
}
