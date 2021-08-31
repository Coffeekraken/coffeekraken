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
        if (typeof cssClass !== 'object' || !cssClass.value || typeof cssClass.value !== 'string')
            return;
        const parts = cssClass.value.split(/\s{2,20000}/).map((l) => l.trim());
        let className = parts === null || parts === void 0 ? void 0 : parts[0];
        const name = __idCompliant(className, {});
        const description = parts && parts[1] ? parts[1] : null;
        res[name] = {
            name: parts[0],
            description,
        };
        if (cssClass.content)
            res[name].content = cssClass.content.join('\n');
    });
    return res;
}
export default cssClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjc3NDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBSWQsT0FBTyxhQUFhLE1BQU0sK0NBQStDLENBQUM7QUFFMUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3RCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxPQUFPLFFBQVEsQ0FBQyxLQUFLLEtBQUssUUFBUTtZQUFFLE9BQU87UUFDbEcsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLFNBQVMsR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV4RCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLFdBQVc7U0FDZCxDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsT0FBTztZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9