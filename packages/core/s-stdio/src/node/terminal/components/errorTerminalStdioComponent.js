import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
/**
 * @name        errorTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'error',
    render(logObj, settings) {
        var _a;
        const value = logObj.value || logObj;
        let logStr = (_a = __toString(value)) !== null && _a !== void 0 ? _a : '';
        if (settings.terminalStdio.actionPrefix) {
            logStr = `<red>Error:</red>\n${logStr}`;
        }
        const lines = logStr.split('\n').map((l) => {
            return __parseHtml(`<red>│</red> ${l}`);
        });
        return `\n${lines.join('\n')}\n`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBRXBFOzs7Ozs7Ozs7R0FTRztBQUNILGVBQWU7SUFDYixFQUFFLEVBQUUsT0FBTztJQUNYLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTs7UUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7UUFFckMsSUFBSSxNQUFNLEdBQUcsTUFBQSxVQUFVLENBQUMsS0FBSyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLE1BQU0sR0FBRyxzQkFBc0IsTUFBTSxFQUFFLENBQUM7U0FDekM7UUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE9BQU8sV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0NBQ0YsQ0FBQyJ9