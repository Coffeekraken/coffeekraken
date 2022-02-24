/**
 * @name                type
 * @namespace           sugar.js.interface.renderers.terminal
 * @type                Function
 *
 * Render the "type" field.
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ value, interfaceClass }) {
  return `<cyan>${value}</cyan>`;
}
