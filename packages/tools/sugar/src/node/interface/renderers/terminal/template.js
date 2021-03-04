"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
/**
 * @name                layout
 * @namespace           sugar.js.interface.renderers.terminal
 * @type                Function
 *
 * Return the layout you want for the "terminal" renderer.
 * You can use tokens like these:
 * - %type : Will be replaced with the "type" field rendered string
 * - %default : Same but for the "default" field
 * - etc...
 *
 * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
 * @return              String                  The renderer template string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ interfaceClass, properties }) {
    let tpl = [];
    tpl = tpl.concat(['', `<yellow>${interfaceClass.name}</yellow> help`, '']);
    if (interfaceClass.description) {
        tpl.push(interfaceClass.description);
        tpl.push('');
    }
    for (let propKey in properties) {
        const propertyObj = properties[propKey];
        const propStr = [];
        let titleStr = `${propertyObj.name} ${propertyObj.type}`;
        tpl.push('');
        propStr.push(titleStr);
        if (propertyObj.alias) {
            propStr.push(`Alias: ${propertyObj.alias}`);
        }
        if (propertyObj.description) {
            // propStr.push('');
            propStr.push(`${propertyObj.description}`);
        }
        if (propertyObj.default) {
            // propStr.push('');
            propStr.push(`<magenta>Default</magenta>: ${propertyObj.default}`);
        }
        tpl.push(propStr
            .join('\n')
            .split('\n')
            .map((line) => {
            return `│ ${line}`;
        })
            .join('\n'));
    }
    return parseHtml_1.default(tpl.join('\n'));
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7QUFFViwyRUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxtQkFBeUIsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFO0lBQ3JELElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztJQUV2QixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFXLGNBQWMsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0UsSUFBSSxjQUFjLENBQUMsV0FBVyxFQUFFO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDZDtJQUVELEtBQUssSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFO1FBQzlCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFFN0IsSUFBSSxRQUFRLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2QixJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQzNCLG9CQUFvQjtZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsb0JBQW9CO1lBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsK0JBQStCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FDTixPQUFPO2FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQzthQUNWLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNaLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2QsQ0FBQztLQUNIO0lBRUQsT0FBTyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBM0NELDRCQTJDQyJ9