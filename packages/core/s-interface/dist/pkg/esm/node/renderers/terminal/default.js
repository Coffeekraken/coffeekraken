import __toString from '@coffeekraken/sugar/shared/string/toString';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ value, interfaceClass }) {
    return `<green>${__toString(value, {})}</green>`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBRXBFOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO0lBQ2hELE9BQU8sVUFBVSxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFDbkQsQ0FBQyJ9