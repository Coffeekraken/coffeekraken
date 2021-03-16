"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const toString_1 = __importDefault(require("../../../string/toString"));
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
    id: 'separator',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const logStr = parseHtml_1.default(toString_1.default(value));
        const character = logObj.character || '-';
        const color = logObj.color || 'yellow';
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 1,
                style: {}
            }
        });
        $component.on('update', () => {
            var _a;
            let width = ((_a = $component.parent) === null || _a === void 0 ? void 0 : _a.innerWidth) || process.stdout.columns;
            $component.width = width;
            const separator = `<${color}>${character.repeat(width)}</${color}>`;
            const logStr = parseHtml_1.default(separator);
            $component.setContent(logStr);
            $component.height = 1;
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yQmxlc3NlZFN0ZGlvQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvc3RkaW8vYmxlc3NlZC9jb21wb25lbnRzL3NlcGFyYXRvckJsZXNzZWRTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwyRUFBcUQ7QUFDckQsd0VBQWtEO0FBQ2xELDJGQUFxRTtBQUVyRTs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLG1CQUFXLENBQUMsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO1FBQzFDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBRXZDLE1BQU0sVUFBVSxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDekMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDRixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7O1lBQzNCLElBQUksS0FBSyxHQUFHLENBQUEsTUFBQSxVQUFVLENBQUMsTUFBTSwwQ0FBRSxVQUFVLEtBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDcEUsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQztZQUNwRSxNQUFNLE1BQU0sR0FBRyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQyJ9