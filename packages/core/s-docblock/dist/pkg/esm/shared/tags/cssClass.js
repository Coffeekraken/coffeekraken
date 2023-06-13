// @ts-nocheck
import { __idCompliant } from '@coffeekraken/sugar/string';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxhQUFhO0lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUVmLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN0QixJQUNJLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDNUIsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUNmLE9BQU8sUUFBUSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBRWxDLE9BQU87UUFDWCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSzthQUN2QixLQUFLLENBQUMsZUFBZSxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRSxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDUixRQUFRO2dCQUNKLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLFdBQVc7U0FDZCxDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEQsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDL0I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=