"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("../../../blessed/SBlessedComponent"));
const SFile_1 = __importDefault(require("../../../fs/SFile"));
/**
 * @name        defaultBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
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
        let color;
        switch (action) {
            case 'save':
                color = 'yellow';
                logStrArray.push(`Saving the file "<cyan>${file.relPath}</cyan>"`);
                break;
            case 'saved':
                color = 'green';
                logStrArray.push(`The file "<cyan>${file.relPath}</cyan>" has been <green>saved successfully</green>`);
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
        if (settings.blessedStdio.actionPrefix) {
            logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
        }
        logStr = parseHtml_1.default(logStr);
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 'shrink',
                style: {},
                content: logStr
            }
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFFckQsMkZBQXFFO0FBQ3JFLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxNQUFNO0lBQ1YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ2IsdUdBQXVHLENBQ3hHLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxlQUFPLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLDRGQUE0RixDQUM3RixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsTUFBTTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ2IsNElBQTRJO2dCQUMxSSxNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsUUFBUTthQUNULENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ2pCLENBQUM7UUFFSixJQUFJLEtBQUssQ0FBQztRQUVWLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxNQUFNO2dCQUNULEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ2hCLFdBQVcsQ0FBQyxJQUFJLENBQ2QsbUJBQW1CLElBQUksQ0FBQyxPQUFPLHFEQUFxRCxDQUNyRixDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCx1Q0FBdUMsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUM5RCxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxXQUFXLENBQUMsSUFBSSxDQUNkLG1CQUFtQixJQUFJLENBQUMsT0FBTyxtREFBbUQsQ0FDbkYsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCxtQkFBbUIsSUFBSSxDQUFDLE9BQU8sNENBQTRDLENBQzVFLENBQUM7Z0JBQ0YsTUFBTTtTQUNUO1FBRUQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxNQUFNLEtBQUssS0FBSyxNQUFNLEVBQUUsQ0FBQztTQUM5RDtRQUVELE1BQU0sR0FBRyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLE1BQU0sVUFBVSxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDekMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsTUFBTTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=