import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
/**
 * @name        headingTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'heading',
    render(logObj, settings = {}) {
        const value = __toString(logObj.value || logObj);
        const color = logObj.color || 'yellow';
        const character = logObj.character ? logObj.character.slice(0, 1) : '-';
        const logStrArray = [];
        logStrArray.push(`<${color}>${character.repeat(process.stdout.columns)}</${color}>`);
        logStrArray.push(value);
        logStrArray.push(`<${color}>${character.repeat(process.stdout.columns)}</${color}>`);
        return __parseHtml(`\n${logStrArray.join('\n')}\n`);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZ1Rlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFkaW5nVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVwRTs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlO0lBQ2IsRUFBRSxFQUFFLFNBQVM7SUFDYixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBRXZDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXhFLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztRQUNqQyxXQUFXLENBQUMsSUFBSSxDQUNkLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FDbkUsQ0FBQztRQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsV0FBVyxDQUFDLElBQUksQ0FDZCxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQ25FLENBQUM7UUFFRixPQUFPLFdBQVcsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRixDQUFDIn0=