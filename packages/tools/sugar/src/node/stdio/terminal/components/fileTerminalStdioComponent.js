"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const SFile_1 = __importDefault(require("../../../fs/SFile"));
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
        if (!(file instanceof SFile_1.default)) {
            throw new Error(`The "<yellow>file</yellow>" property must be an instance of the "<cyan>SFile</cyan>" class`);
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
                str = `Saving the file "<cyan>${file.relPath}</cyan>"`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'saved':
                color = 'green';
                str = `The file "<cyan>${file.relPath}</cyan>" has been <green>saved successfully</green>`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'delete':
                color = 'yellow';
                logStrArray.push(`<red>Deleting</red> the file "<cyan>${file.relPath}</cyan>"`);
                break;
            case 'deleted':
                color = 'red';
                logStrArray.push(`The file "<cyan>${file.relPath}</cyan>" has been <red>deleted successfully</red>`);
                break;
            case 'update':
            case 'updated':
                color = 'yellow';
                logStrArray.push(`The file "<cyan>${file.relPath}</cyan>" has been <yellow>updated</yellow>`);
                break;
        }
        let logStr = logStrArray.join('\n');
        if (settings.terminalStdio.actionPrefix) {
            logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
        }
        return parseHtml_1.default(logStr);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJFQUFxRDtBQUVyRCw4REFBd0M7QUFFeEM7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsTUFBTTtJQUNWLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUNiLHVHQUF1RyxDQUN4RyxDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksZUFBTyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RkFBNEYsQ0FDN0YsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLE1BQU07WUFDVCxNQUFNLElBQUksS0FBSyxDQUNiLDRJQUE0STtnQkFDMUksTUFBTTtnQkFDTixRQUFRO2dCQUNSLFFBQVE7YUFDVCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNqQixDQUFDO1FBRUosSUFBSSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQ2YsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLE1BQU07Z0JBQ1QsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsR0FBRyxHQUFHLDBCQUEwQixJQUFJLENBQUMsT0FBTyxVQUFVLENBQUM7Z0JBQ3ZELElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRTtvQkFDYixHQUFHLElBQUksaUJBQWlCLE1BQU0sQ0FBQyxFQUFFLGFBQWEsQ0FBQztpQkFDaEQ7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUNoQixHQUFHLEdBQUcsbUJBQW1CLElBQUksQ0FBQyxPQUFPLHFEQUFxRCxDQUFDO2dCQUMzRixJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7b0JBQ2IsR0FBRyxJQUFJLGlCQUFpQixNQUFNLENBQUMsRUFBRSxhQUFhLENBQUM7aUJBQ2hEO2dCQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCx1Q0FBdUMsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUM5RCxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxXQUFXLENBQUMsSUFBSSxDQUNkLG1CQUFtQixJQUFJLENBQUMsT0FBTyxtREFBbUQsQ0FDbkYsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCxtQkFBbUIsSUFBSSxDQUFDLE9BQU8sNENBQTRDLENBQzVFLENBQUM7Z0JBQ0YsTUFBTTtTQUNUO1FBRUQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLE1BQU0sR0FBRyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxNQUFNLEtBQUssS0FBSyxNQUFNLEVBQUUsQ0FBQztTQUM5RDtRQUVELE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0YsQ0FBQyJ9