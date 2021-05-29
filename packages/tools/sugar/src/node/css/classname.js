// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            classname
 * @namespace            node.css
 * @type            Function
 * @status              beta
 *
 * This function take a classname you want to generate and returns you the prefixed (if prefix exists in config.classes) classname
 *
 * @param       {String}            classname               The classname to generate
 * @return      {String}                                    The correctly preffixed classname
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import classname from '@coffeekraken/sugar/node/css/classname';
 * classname('coco'); // => s-coco
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function classname(classname) {
    const prefix = __SugarConfig.get('classes.generate.prefix');
    if (prefix)
        return `${prefix}-${classname}`;
    return classname;
}
export default classname;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3NuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsU0FBUztJQUMxQixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDNUQsSUFBSSxNQUFNO1FBQUUsT0FBTyxHQUFHLE1BQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUM1QyxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==