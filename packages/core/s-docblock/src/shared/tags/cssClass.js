// @ts-nocheck
import __idCompliant from '@coffeekraken/sugar/shared/string/idCompliant';
/**
 * @name              cssClass
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the cssClass tag
 *
 * @cssClass       {Object}          data        The data object parsed in the string
 * @cssClass       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @cssClass      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function cssClass(data, blockSettings) {
    if (!Array.isArray(data))
        data = [data];
    const res = {};
    data.forEach((cssClass) => {
        if (typeof cssClass !== 'object' ||
            !cssClass.value ||
            typeof cssClass.value !== 'string')
            return;
        const parts = cssClass.value.split(/\s{2,20000}/).map((l) => l.trim());
        let className = parts === null || parts === void 0 ? void 0 : parts[0];
        const name = __idCompliant(className, {});
        const description = new String(parts && parts[1] ? parts[1] : null);
        description.render = true;
        res[name] = {
            name: parts[0],
            description,
        };
        if (cssClass.content) {
            const content = new String(cssClass.content.join('\n'));
            content.render = true;
            res[name].content = content;
        }
    });
    return res;
}
export default cssClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjc3NDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBSWQsT0FBTyxhQUFhLE1BQU0sK0NBQStDLENBQUM7QUFFMUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3RCLElBQ0ksT0FBTyxRQUFRLEtBQUssUUFBUTtZQUM1QixDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ2YsT0FBTyxRQUFRLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFFbEMsT0FBTztRQUNYLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxTQUFTLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRSxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLFdBQVc7U0FDZCxDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDL0I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=