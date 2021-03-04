// @shared

import __toString from '../../../string/toString';

/**
 * @name                default
 * @namespace           sugar.js.interface.renderers.terminal
 * @default                Function
 *
 * Render the "default" field.
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ value, interfaceClass }) {
  return `<green>${__toString(value, {})}</green>`;
}
