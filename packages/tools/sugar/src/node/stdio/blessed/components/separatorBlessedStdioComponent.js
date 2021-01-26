"use strict";
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
                height: 'shrink',
                style: {},
                content: parseHtml_1.default(`\n<${color}>${character.repeat(process.stdout.columns)}</${color}>\n`)
            }
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yQmxlc3NlZFN0ZGlvQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VwYXJhdG9yQmxlc3NlZFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQXFEO0FBQ3JELHdFQUFrRDtBQUNsRCwyRkFBcUU7QUFFckU7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxtQkFBVyxDQUFDLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUU5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztRQUV2QyxNQUFNLFVBQVUsR0FBRyxJQUFJLDJCQUFtQixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLG1CQUFXLENBQ2xCLE1BQU0sS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FDdkU7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=