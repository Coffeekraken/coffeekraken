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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFFcEU7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDaEQsT0FBTyxVQUFVLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNuRCxDQUFDIn0=