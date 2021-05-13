import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
/**
 * @name        defaultTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'default',
    render(logObj, settings = {}) {
        const value = logObj.value !== undefined ? logObj.value : logObj;
        return __parseHtml(__toString(value));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdFRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0VGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVwRTs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlO0lBQ2IsRUFBRSxFQUFFLFNBQVM7SUFDYixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDakUsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztDQUNGLENBQUMifQ==