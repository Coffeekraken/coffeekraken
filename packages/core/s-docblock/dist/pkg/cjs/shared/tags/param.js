"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveTypeString_1 = __importDefault(require("@coffeekraken/sugar/node/type/resolveTypeString"));
const parse_1 = __importDefault(require("@coffeekraken/sugar/shared/string/parse"));
/**
 * @name              param
 * @namespace           node.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @param      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function param(data, blockSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(data))
            data = [data];
        const res = {};
        for (let [i, param] of Object.entries(data)) {
            if (typeof param !== 'object' ||
                !param.value ||
                typeof param.value !== 'string')
                return;
            const parts = param.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
            let typeStr = parts && parts[0] ? parts[0] : null;
            const variable = parts && parts[1] ? parts[1] : null;
            const description = new String(parts && parts[2] ? parts[2] : null);
            description.render = true;
            let name = variable;
            let defaultValue = undefined;
            let defaultValueStr = '';
            let variableMatch = null;
            let type;
            if (variable && typeof variable === 'string')
                variableMatch = variable.match(/^\[(.*)\]$/);
            // resolve type string
            type = yield (0, resolveTypeString_1.default)(typeStr);
            if (variableMatch) {
                const variableParts = variableMatch[1].split('=');
                if (variableParts.length === 2) {
                    name = variableParts[0].trim();
                    defaultValueStr = variableParts[1].trim();
                    defaultValue = (0, parse_1.default)(variableParts[1].trim());
                }
            }
            res[name] = {
                name,
                type,
                description,
                default: defaultValue,
                defaultStr: defaultValueStr,
            };
            if (param.content)
                res[name].content = param.content.join('\n');
        }
        return res;
    });
}
exports.default = param;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdHQUFrRjtBQUNsRixvRkFBOEQ7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQWUsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhOztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZixLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUNJLE9BQU8sS0FBSyxLQUFLLFFBQVE7Z0JBQ3pCLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ1osT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVE7Z0JBRS9CLE9BQU87WUFDWCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksT0FBTyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xELE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JELE1BQU0sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ3BCLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDekIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksSUFBSSxDQUFDO1lBRVQsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUTtnQkFDeEMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFakQsc0JBQXNCO1lBQ3RCLElBQUksR0FBRyxNQUFNLElBQUEsMkJBQW1CLEVBQUMsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbEQsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsZUFBZSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsWUFBWSxHQUFHLElBQUEsZUFBTyxFQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRDthQUNKO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNSLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixXQUFXO2dCQUNYLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixVQUFVLEVBQUUsZUFBZTthQUM5QixDQUFDO1lBRUYsSUFBSSxLQUFLLENBQUMsT0FBTztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25FO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQUE7QUFDRCxrQkFBZSxLQUFLLENBQUMifQ==