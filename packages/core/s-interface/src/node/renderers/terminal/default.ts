import { __toString } from '@coffeekraken/sugar/string';

/**
 * @name                default
 * @namespace           renderers.terminal
 * @type                Function
 * @platform            node
 * @status              beta
 * @private
 *
 * Render the "default" field.
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ value, interfaceClass }) {
    return `<green>${__toString(value, {})}</green>`;
}
