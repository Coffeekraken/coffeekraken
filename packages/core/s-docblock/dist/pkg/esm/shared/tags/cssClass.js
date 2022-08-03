// @ts-nocheck
import __idCompliant from '@coffeekraken/sugar/shared/string/idCompliant';
/**
 * @name              cssClass
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
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
        const parts = cssClass.value
            .split(/\s{2,9999}|\t/)
            .map((l) => l.trim());
        let className = parts === null || parts === void 0 ? void 0 : parts[0];
        const name = __idCompliant(className, {});
        const description = new String(parts && parts[1] ? parts[1] : null);
        description.render = true;
        res[name] = {
            toString() {
                return name;
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUUxRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3RCLElBQ0ksT0FBTyxRQUFRLEtBQUssUUFBUTtZQUM1QixDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ2YsT0FBTyxRQUFRLENBQUMsS0FBSyxLQUFLLFFBQVE7WUFFbEMsT0FBTztRQUNYLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLO2FBQ3ZCLEtBQUssQ0FBQyxlQUFlLENBQUM7YUFDdEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQixJQUFJLFNBQVMsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUNSLFFBQVE7Z0JBQ0osT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUNELElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsV0FBVztTQUNkLENBQUM7UUFDRixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDbEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUMvQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==