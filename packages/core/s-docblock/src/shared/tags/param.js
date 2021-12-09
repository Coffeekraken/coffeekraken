// @ts-nocheck
import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
/**
 * @name              param
 * @namespace           shared.tags
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
            ? __upperFirst(parts[0].replace('{', '').replace('}', ''))
            : null;
        const variable = parts && parts[1] ? parts[1] : null;
        const description = new String(parts && parts[2] ? parts[2] : null);
        description.render = true;
        let name = variable;
        let defaultValue = undefined;
        let defaultValueStr = '';
        let variableMatch = null;
        if (variable && typeof variable === 'string')
            variableMatch = variable.match(/^\[(.*)\]$/);
        if (type && type.includes('|')) {
            type = type.split('|').map((l) => __upperFirst(l.trim()));
        }
        else {
            type = [type];
        }
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
    });
    return res;
}
export default param;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0seUNBQXlDLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhO0lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUVmLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNuQixJQUNJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFDekIsQ0FBQyxLQUFLLENBQUMsS0FBSztZQUNaLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRO1lBRS9CLE9BQU87UUFDWCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksSUFBSSxHQUNKLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDZixNQUFNLFFBQVEsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRCxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDN0IsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQ3hDLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0gsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFFRCxJQUFJLGFBQWEsRUFBRTtZQUNmLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsZUFBZSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNuRDtTQUNKO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ1IsSUFBSTtZQUNKLElBQUk7WUFDSixXQUFXO1lBQ1gsT0FBTyxFQUFFLFlBQVk7WUFDckIsVUFBVSxFQUFFLGVBQWU7U0FDOUIsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLE9BQU87WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==