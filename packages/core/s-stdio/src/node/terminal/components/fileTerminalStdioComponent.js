import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
/**
 * @name        fileTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'file',
    render(logObj, settings) {
        var _a, _b, _c, _d, _e;
        const value = logObj.value || logObj;
        const action = logObj.action;
        const file = logObj.file;
        const logStrArray = [];
        if (!file) {
            throw new Error(`You must specify a "<yellow>file</yellow>" property in order to use the "<cyan>file</cyan>" log type.`);
        }
        if (!action)
            throw new Error(`You must specify a "<yellow>action</yellow>" property in order to use the "<cyan>file</cyan>" log type. Here's the supported actions:\n- ${[
                'save',
                'delete',
                'update'
            ].join('\n- ')}`);
        let color, str;
        switch (action) {
            case 'save':
                color = 'yellow';
                str = `Saving file "<cyan>${(_a = file.relPath) !== null && _a !== void 0 ? _a : file.path}</cyan>"`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'saved':
                color = 'green';
                str = `File "<cyan>${(_b = file.relPath) !== null && _b !== void 0 ? _b : file.path}</cyan>" <green>saved successfully</green>`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'delete':
                color = 'yellow';
                logStrArray.push(`File "<cyan>${(_c = file.relPath) !== null && _c !== void 0 ? _c : file.path}</cyan>"`);
                break;
            case 'deleted':
                color = 'red';
                logStrArray.push(`File "<cyan>${(_d = file.relPath) !== null && _d !== void 0 ? _d : file.path}</cyan>" <red>deleted successfully</red>`);
                break;
            case 'update':
            case 'updated':
                color = 'yellow';
                logStrArray.push(`File "<cyan>${(_e = file.relPath) !== null && _e !== void 0 ? _e : file.path}</cyan>"`);
                break;
        }
        let logStr = logStrArray.join('\n');
        if (settings.terminalStdio.actionPrefix) {
            logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
        }
        return __parseHtml(logStr);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUV2RTs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlO0lBQ2IsRUFBRSxFQUFFLE1BQU07SUFDVixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQWE7O1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ2IsdUdBQXVHLENBQ3hHLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FDYiw0SUFBNEk7Z0JBQzFJLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixRQUFRO2FBQ1QsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDakIsQ0FBQztRQUVKLElBQUksS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUNmLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxNQUFNO2dCQUNULEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLEdBQUcsR0FBRyxzQkFBc0IsTUFBQSxJQUFJLENBQUMsT0FBTyxtQ0FBSSxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUM7Z0JBQ2hFLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRTtvQkFDYixHQUFHLElBQUksaUJBQWlCLE1BQU0sQ0FBQyxFQUFFLGFBQWEsQ0FBQztpQkFDaEQ7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUNoQixHQUFHLEdBQUcsZUFDSixNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLElBQUksQ0FBQyxJQUN2Qiw0Q0FBNEMsQ0FBQztnQkFDN0MsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFO29CQUNiLEdBQUcsSUFBSSxpQkFBaUIsTUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDO2lCQUNoRDtnQkFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxNQUFBLElBQUksQ0FBQyxPQUFPLG1DQUFJLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsV0FBVyxDQUFDLElBQUksQ0FDZCxlQUNFLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksSUFBSSxDQUFDLElBQ3ZCLDBDQUEwQyxDQUMzQyxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssU0FBUztnQkFDWixLQUFLLEdBQUcsUUFBUSxDQUFDO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsTUFBQSxJQUFJLENBQUMsT0FBTyxtQ0FBSSxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQztnQkFDckUsTUFBTTtTQUNUO1FBRUQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLE1BQU0sR0FBRyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxNQUFNLEtBQUssS0FBSyxNQUFNLEVBQUUsQ0FBQztTQUM5RDtRQUVELE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRixDQUFDIn0=