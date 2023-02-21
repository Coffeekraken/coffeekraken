/**
 * @name                alias
 * @namespace           renderers.terminal
 * @name                Function
 * @platform          node
 * @status          beta
 * @private
 *
 * Render the "alias" field.
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ value, interfaceClass }) {
    return `-${value}`;
}
