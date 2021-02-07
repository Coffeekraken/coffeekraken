"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parse_1 = __importDefault(require("../../string/parse"));
const upperFirst_1 = __importDefault(require("../../string/upperFirst"));
/**
 * @name              param
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 * @status              wip
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function param(data) {
    if (!Array.isArray(data))
        data = [data];
    const res = {};
    data.forEach((param) => {
        if (typeof param !== 'object' ||
            !param.value ||
            typeof param.value !== 'string')
            return;
        const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());
        let type = parts && parts[0]
            ? upperFirst_1.default(parts[0].replace('{', '').replace('}', ''))
            : null;
        const variable = parts && parts[1] ? parts[1] : null;
        const description = parts && parts[2] ? parts[2] : null;
        let name = variable;
        let defaultValue = undefined;
        let variableMatch = null;
        if (variable && typeof variable === 'string')
            variableMatch = variable.match(/^\[(.*)\]$/);
        if (type && type.includes('|')) {
            type = type.split('|').map((l) => upperFirst_1.default(l.trim()));
        }
        if (variableMatch) {
            const variableParts = variableMatch[1].split('=');
            if (variableParts.length === 2) {
                name = variableParts[0].trim();
                defaultValue = parse_1.default(variableParts[1].trim());
            }
        }
        res[name] = {
            name,
            type,
            description,
            default: defaultValue
        };
        if (param.content)
            res[name].content = param.content.join('\n');
    });
    return res;
}
module.exports = param;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7QUFFViwrREFBeUM7QUFDekMseUVBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtJQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckIsSUFDRSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQ3pCLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDWixPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUTtZQUUvQixPQUFPO1FBQ1QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLElBQUksR0FDTixLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JELE1BQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDMUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFL0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG9CQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksYUFBYSxFQUFFO1lBQ2pCLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsWUFBWSxHQUFHLGVBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNqRDtTQUNGO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ1YsSUFBSTtZQUNKLElBQUk7WUFDSixXQUFXO1lBQ1gsT0FBTyxFQUFFLFlBQVk7U0FDdEIsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLE9BQU87WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBQ0QsaUJBQVMsS0FBSyxDQUFDIn0=