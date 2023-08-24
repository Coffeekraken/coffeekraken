"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            expandPleasantCssClassname
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something-cool something_desktop", etc...
 *
 * @param     {String}          classesStr          The classes string to convert like "s-typo:h1 s-font:40", etc...
 * @return    {String}                      The processed string with converted classnames
 *
 * @snippet         __expandPleasantCssClassname($1)
 *
 * @feature         Support the classmap feature throught the SClassmap class inited from the SFront class
 *
 * @example         js
 * import { __expandPleasantCssClassname } from '@coffeekraken/sugar/html';
 * __expandPleasantCssClassname('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __expandPleasantCssClassname(classesStr) {
    var _a, _b;
    let classesArray = [];
    const classNames = classesStr.split(/\s+/);
    let currentMedia = '';
    classNames.forEach((className) => {
        if (className.slice(0, 1) == '@') {
            currentMedia = className.replace('@', '_');
            return;
        }
        const parts = className.split(':');
        if (parts.length === 1) {
            let name = className;
            if (currentMedia !== '')
                name = className + currentMedia;
            classesArray.push(name);
        }
        else {
            const firstClass = parts[0];
            let name = firstClass;
            if (currentMedia !== '')
                name = firstClass + currentMedia;
            classesArray.push(name);
            parts.forEach((part, i) => {
                if (i > 0) {
                    name = firstClass + '-' + part;
                    if (currentMedia !== '')
                        name = name + currentMedia;
                    classesArray.push(name);
                }
            });
        }
    });
    // classmap
    if ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap) {
        classesArray = classesArray.map((cls) => document.env.SUGAR.classmap.resolve(cls));
    }
    return classesArray.join(' ');
}
exports.default = __expandPleasantCssClassname;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLDRCQUE0QixDQUNoRCxVQUFrQjs7SUFFbEIsSUFBSSxZQUFZLEdBQWEsRUFBRSxDQUFDO0lBRWhDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXRCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUM5QixZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNWO1FBRUQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUNyQixJQUFJLFlBQVksS0FBSyxFQUFFO2dCQUFFLElBQUksR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNILE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUM7WUFDdEIsSUFBSSxZQUFZLEtBQUssRUFBRTtnQkFBRSxJQUFJLEdBQUcsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUMxRCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxJQUFJLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBQy9CLElBQUksWUFBWSxLQUFLLEVBQUU7d0JBQUUsSUFBSSxHQUFHLElBQUksR0FBRyxZQUFZLENBQUM7b0JBQ3BELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVztJQUNYLElBQUksTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsUUFBUSxFQUFFO1FBQy9CLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDcEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDM0MsQ0FBQztLQUNMO0lBRUQsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUE3Q0QsK0NBNkNDIn0=