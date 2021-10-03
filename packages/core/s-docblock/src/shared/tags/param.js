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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0seUNBQXlDLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ25CLElBQ0ksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUN6QixDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ1osT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFFL0IsT0FBTztRQUNYLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxJQUFJLEdBQ0osS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNmLE1BQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JELE1BQU0sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDeEMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFakQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDSCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUVELElBQUksYUFBYSxFQUFFO1lBQ2YsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMvQixlQUFlLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7UUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJO1lBQ0osSUFBSTtZQUNKLFdBQVc7WUFDWCxPQUFPLEVBQUUsWUFBWTtZQUNyQixVQUFVLEVBQUUsZUFBZTtTQUM5QixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTztZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9