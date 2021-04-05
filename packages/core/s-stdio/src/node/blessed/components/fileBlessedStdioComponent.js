"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("@coffeekraken/sugar/node/blessed/SBlessedComponent"));
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
                logStrArray.push(`<yellow>[save]</yellow> File "<cyan>${file.relPath}</cyan>"`);
                break;
            case 'saved':
                color = 'green';
                let str = `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" <green>saved successfully</green>`;
                if (logObj.to) {
                    str += ` to "<magenta>${logObj.to}</magenta>"`;
                }
                logStrArray.push(str);
                break;
            case 'delete':
                color = 'yellow';
                logStrArray.push(`<yellow>[delete]</yellow> File "<cyan>${file.relPath}</cyan>"`);
                break;
            case 'deleted':
                color = 'red';
                logStrArray.push(`<green>[delete]</green> File "<cyan>${file.relPath}</cyan>" <red>deleted successfully</red>`);
                break;
            case 'update':
            case 'updated':
                color = 'yellow';
                logStrArray.push(`<yellow>[update]</yellow> File "<cyan>${file.relPath}</cyan>"`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNkZBQXVFO0FBQ3ZFLDJHQUFxRjtBQUVyRjs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxNQUFNO0lBQ1YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ2IsdUdBQXVHLENBQ3hHLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxNQUFNO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FDYiw0SUFBNEk7Z0JBQzFJLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixRQUFRO2FBQ1QsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDakIsQ0FBQztRQUVKLElBQUksS0FBSyxDQUFDO1FBRVYsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLE1BQU07Z0JBQ1QsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCx1Q0FBdUMsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUM5RCxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDaEIsSUFBSSxHQUFHLEdBQUcscUNBQXFDLElBQUksQ0FBQyxPQUFPLDRDQUE0QyxDQUFDO2dCQUN4RyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7b0JBQ2IsR0FBRyxJQUFJLGlCQUFpQixNQUFNLENBQUMsRUFBRSxhQUFhLENBQUM7aUJBQ2hEO2dCQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCx5Q0FBeUMsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUNoRSxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxXQUFXLENBQUMsSUFBSSxDQUNkLHVDQUF1QyxJQUFJLENBQUMsT0FBTywwQ0FBMEMsQ0FDOUYsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFNBQVM7Z0JBQ1osS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDakIsV0FBVyxDQUFDLElBQUksQ0FDZCx5Q0FBeUMsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUNoRSxDQUFDO2dCQUNGLE1BQU07U0FDVDtRQUVELElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtZQUN0QyxNQUFNLEdBQUcsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sTUFBTSxLQUFLLEtBQUssTUFBTSxFQUFFLENBQUM7U0FDOUQ7UUFFRCxNQUFNLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QixNQUFNLFVBQVUsR0FBRyxJQUFJLDJCQUFtQixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzNCLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUMifQ==