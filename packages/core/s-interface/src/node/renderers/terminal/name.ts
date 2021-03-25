/**
 * @name                name
 * @namespace           sugar.js.interface.renderers.terminal
 * @name                Function
 *
 * Render the "name" field.
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ value, interfaceClass }) {
  return `<yellow>${value}</yellow>`;
}
