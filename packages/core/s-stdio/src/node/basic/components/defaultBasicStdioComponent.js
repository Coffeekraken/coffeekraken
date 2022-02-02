import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
/**
 * @name        defaultBasicStdioComponent
 * @namespace   shared.basic.components
 * @type        ISStdioComponent
 *
 * Basic stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'default',
    render(logObj, settings = {}) {
        const value = logObj.value !== undefined ? logObj.value : logObj;
        return __parseHtml(__toString(value));
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdEJhc2ljU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0QmFzaWNTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVwRTs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlO0lBQ1gsRUFBRSxFQUFFLFNBQVM7SUFDYixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDakUsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKLENBQUMifQ==