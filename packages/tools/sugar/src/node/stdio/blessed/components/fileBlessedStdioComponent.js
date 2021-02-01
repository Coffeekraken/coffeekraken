"use strict";
// @ts-nocheck
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
                let str = `The file "<cyan>${file.relPath}</cyan>" has been <green>saved successfully</green>`;
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
        if (settings.blessedStdio.actionPrefix) {
            logStr = `<${color}>[${logObj.action}]</${color}> ${logStr}`;
        }
        logStr = parseHtml_1.default(logStr);
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 0,
                style: {}
            }
        });
        $component.on('update', () => {
            $component.setContent(logStr);
            $component.height = $component.realHeight;
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkVBQXFEO0FBRXJELDJGQUFxRTtBQUNyRSw4REFBd0M7QUFFeEM7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsTUFBTTtJQUNWLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUNiLHVHQUF1RyxDQUN4RyxDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksZUFBTyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDYiw0RkFBNEYsQ0FDN0YsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLE1BQU07WUFDVCxNQUFNLElBQUksS0FBSyxDQUNiLDRJQUE0STtnQkFDMUksTUFBTTtnQkFDTixRQUFRO2dCQUNSLFFBQVE7YUFDVCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNqQixDQUFDO1FBRUosSUFBSSxLQUFLLENBQUM7UUFFVixRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssTUFBTTtnQkFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLDBCQUEwQixJQUFJLENBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUNoQixJQUFJLEdBQUcsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLE9BQU8scURBQXFELENBQUM7Z0JBQy9GLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRTtvQkFDYixHQUFHLElBQUksaUJBQWlCLE1BQU0sQ0FBQyxFQUFFLGFBQWEsQ0FBQztpQkFDaEQ7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxLQUFLLEdBQUcsUUFBUSxDQUFDO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUNkLHVDQUF1QyxJQUFJLENBQUMsT0FBTyxVQUFVLENBQzlELENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNkLFdBQVcsQ0FBQyxJQUFJLENBQ2QsbUJBQW1CLElBQUksQ0FBQyxPQUFPLG1EQUFtRCxDQUNuRixDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssU0FBUztnQkFDWixLQUFLLEdBQUcsUUFBUSxDQUFDO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUNkLG1CQUFtQixJQUFJLENBQUMsT0FBTyw0Q0FBNEMsQ0FDNUUsQ0FBQztnQkFDRixNQUFNO1NBQ1Q7UUFFRCxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7WUFDdEMsTUFBTSxHQUFHLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxNQUFNLE1BQU0sS0FBSyxLQUFLLE1BQU0sRUFBRSxDQUFDO1NBQzlEO1FBRUQsTUFBTSxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSwyQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUMzQixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=