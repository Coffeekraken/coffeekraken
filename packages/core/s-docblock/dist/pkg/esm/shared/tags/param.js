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
import __resolveTypeString from '@coffeekraken/sugar/node/type/resolveTypeString';
import __parse from '@coffeekraken/sugar/shared/string/parse';
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
            type = yield __resolveTypeString(typeStr);
            if (variableMatch) {
                const variableParts = variableMatch[1].split('=');
                if (variableParts.length === 2) {
                    name = variableParts[0].trim();
                    defaultValueStr = variableParts[1].trim();
                    defaultValue = __parse(variableParts[1].trim());
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
export default param;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLG1CQUFtQixNQUFNLGlEQUFpRCxDQUFDO0FBQ2xGLE9BQU8sT0FBTyxNQUFNLHlDQUF5QyxDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFlLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYTs7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWYsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFDSSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUN6QixDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUNaLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRO2dCQUUvQixPQUFPO1lBQ1gsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLE9BQU8sR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNsRCxNQUFNLFFBQVEsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLElBQUksQ0FBQztZQUVULElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7Z0JBQ3hDLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWpELHNCQUFzQjtZQUN0QixJQUFJLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUxQyxJQUFJLGFBQWEsRUFBRTtnQkFDZixNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVsRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM1QixJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMvQixlQUFlLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMxQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRDthQUNKO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNSLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixXQUFXO2dCQUNYLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixVQUFVLEVBQUUsZUFBZTthQUM5QixDQUFDO1lBRUYsSUFBSSxLQUFLLENBQUMsT0FBTztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25FO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQUE7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9