import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
/**
 * @name            configValue
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to "sanitize" some configuration values makes absolute paths to relative, etc...
 *
 * @param       {Any}        value            The value to sanitize
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configValue(value) {
    if (typeof value !== 'string')
        return value;
    return value.replace(`${__packageRoot()}/`, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWdWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLEtBQWE7SUFDN0MsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsYUFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDIn0=