"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("../../../blessed/SBlessedComponent"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL3N0ZGlvL2JsZXNzZWQvY29tcG9uZW50cy9maWxlQmxlc3NlZFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUVyRCwyRkFBcUU7QUFHckU7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsTUFBTTtJQUNWLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUNiLHVHQUF1RyxDQUN4RyxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsTUFBTTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQ2IsNElBQTRJO2dCQUMxSSxNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsUUFBUTthQUNULENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ2pCLENBQUM7UUFFSixJQUFJLEtBQUssQ0FBQztRQUVWLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxNQUFNO2dCQUNULEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQ2QsdUNBQXVDLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FDOUQsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ2hCLElBQUksR0FBRyxHQUFHLHFDQUFxQyxJQUFJLENBQUMsT0FBTyw0Q0FBNEMsQ0FBQztnQkFDeEcsSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFO29CQUNiLEdBQUcsSUFBSSxpQkFBaUIsTUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDO2lCQUNoRDtnQkFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQ2QseUNBQXlDLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FDaEUsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ2QsV0FBVyxDQUFDLElBQUksQ0FDZCx1Q0FBdUMsSUFBSSxDQUFDLE9BQU8sMENBQTBDLENBQzlGLENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxTQUFTO2dCQUNaLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQ2QseUNBQXlDLElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FDaEUsQ0FBQztnQkFDRixNQUFNO1NBQ1Q7UUFFRCxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7WUFDdEMsTUFBTSxHQUFHLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxNQUFNLE1BQU0sS0FBSyxLQUFLLE1BQU0sRUFBRSxDQUFDO1NBQzlEO1FBRUQsTUFBTSxHQUFHLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSwyQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUMzQixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=