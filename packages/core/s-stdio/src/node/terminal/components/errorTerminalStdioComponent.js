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
        const value = logObj.value || logObj;
        let logStr = __toString(value);
        if (settings.terminalStdio.actionPrefix) {
            logStr = `<red>Error:</red>\n${logStr}`;
        }
        const lines = logStr.split('\n').map((l) => {
            return __parseHtml(`<red>│</red> ${l}`);
        });
        return `\n${lines.join('\n')}\n`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBRXBFOzs7Ozs7Ozs7R0FTRztBQUNILGVBQWU7SUFDYixFQUFFLEVBQUUsT0FBTztJQUNYLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUVyQyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUN2QyxNQUFNLEdBQUcsc0JBQXNCLE1BQU0sRUFBRSxDQUFDO1NBQ3pDO1FBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxPQUFPLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUMifQ==