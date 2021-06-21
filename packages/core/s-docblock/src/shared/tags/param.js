// @ts-nocheck
import __parse from '@coffeekraken/sugar/shared/string/parse';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
/**
 * @name              param
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
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
        const description = parts && parts[2] ? parts[2] : null;
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
            defaultStr: defaultValueStr
        };
        if (param.content)
            res[name].content = param.content.join('\n');
    });
    return res;
}
export default param;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0seUNBQXlDLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3JCLElBQ0UsT0FBTyxLQUFLLEtBQUssUUFBUTtZQUN6QixDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ1osT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFFL0IsT0FBTztRQUNULE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxJQUFJLEdBQ04sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JELE1BQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDN0IsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQzFDLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9DLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0wsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZjtRQUVELElBQUksYUFBYSxFQUFFO1lBQ2pCLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsZUFBZSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNqRDtTQUNGO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ1YsSUFBSTtZQUNKLElBQUk7WUFDSixXQUFXO1lBQ1gsT0FBTyxFQUFFLFlBQVk7WUFDckIsVUFBVSxFQUFFLGVBQWU7U0FDNUIsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLE9BQU87WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==