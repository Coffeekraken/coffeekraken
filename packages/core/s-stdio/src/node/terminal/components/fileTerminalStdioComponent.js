"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
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
exports.default = {
    id: 'file',
    render(logObj, settings) {
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
                str = `Saving file "<cyan>${file.relPath}</cyan>"`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'saved':
                color = 'green';
                str = `File "<cyan>${file.relPath}</cyan>" <green>saved successfully</green>`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'delete':
                color = 'yellow';
                logStrArray.push(`File "<cyan>${file.relPath}</cyan>"`);
                break;
            case 'deleted':
                color = 'red';
                logStrArray.push(`File "<cyan>${file.relPath}</cyan>" <red>deleted successfully</red>`);
                break;
            case 'update':
            case 'updated':
                color = 'yellow';
                logStrArray.push(`File "<cyan>${file.relPath}</cyan>"`);
                break;
        }
        let logStr = logStrArray.join('\n');
        if (settings.terminalStdio.actionPrefix) {
            logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
        }
        return parseHtml_1.default(logStr);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUF1RTtBQUV2RTs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxNQUFNO0lBQ1YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ2IsdUdBQXVHLENBQ3hHLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FDYiw0SUFBNEk7Z0JBQzFJLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixRQUFRO2FBQ1QsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDakIsQ0FBQztRQUVKLElBQUksS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUNmLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxNQUFNO2dCQUNULEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLEdBQUcsR0FBRyxzQkFBc0IsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUFDO2dCQUNuRCxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7b0JBQ2IsR0FBRyxJQUFJLGlCQUFpQixNQUFNLENBQUMsRUFBRSxhQUFhLENBQUM7aUJBQ2hEO2dCQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDaEIsR0FBRyxHQUFHLGVBQWUsSUFBSSxDQUFDLE9BQU8sNENBQTRDLENBQUM7Z0JBQzlFLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRTtvQkFDYixHQUFHLElBQUksaUJBQWlCLE1BQU0sQ0FBQyxFQUFFLGFBQWEsQ0FBQztpQkFDaEQ7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxLQUFLLEdBQUcsUUFBUSxDQUFDO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUFDLENBQUM7Z0JBQ3hELE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxXQUFXLENBQUMsSUFBSSxDQUNkLGVBQWUsSUFBSSxDQUFDLE9BQU8sMENBQTBDLENBQ3RFLENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxTQUFTO2dCQUNaLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtTQUNUO1FBRUQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLE1BQU0sR0FBRyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxNQUFNLEtBQUssS0FBSyxNQUFNLEVBQUUsQ0FBQztTQUM5RDtRQUVELE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0YsQ0FBQyJ9