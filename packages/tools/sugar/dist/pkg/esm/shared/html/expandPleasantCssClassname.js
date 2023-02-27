/**
 * @name            expandPleasantCssClassname
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
 *
 * @param     {String}          classesStr          The classes string to convert like "s-typo:h1 s-font:40", etc...
 * @return    {String}                      The processed string with converted classnames
 *
 * @snippet         __expandPleasantCssClassname($1)
 *
 * @example         js
 * import { __expandPleasantCssClassname } from '@coffeekraken/sugar/html';
 * __expandPleasantCssClassname('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __expandPleasantCssClassname(classesStr) {
    const classesArray = [];
    const classNames = classesStr.split(/\s+/);
    let currentMedia = '';
    classNames.forEach((className) => {
        if (className.slice(0, 1) == '@') {
            currentMedia = className.replace('@', '___');
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
                    name = firstClass + '--' + part;
                    if (currentMedia !== '')
                        name = name + currentMedia;
                    classesArray.push(name);
                }
            });
        }
    });
    return classesArray.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSw0QkFBNEIsQ0FDaEQsVUFBa0I7SUFFbEIsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO0lBRWxDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXRCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUM5QixZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsT0FBTztTQUNWO1FBRUQsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUNyQixJQUFJLFlBQVksS0FBSyxFQUFFO2dCQUFFLElBQUksR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNILE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUM7WUFDdEIsSUFBSSxZQUFZLEtBQUssRUFBRTtnQkFBRSxJQUFJLEdBQUcsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUMxRCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxJQUFJLEdBQUcsVUFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hDLElBQUksWUFBWSxLQUFLLEVBQUU7d0JBQUUsSUFBSSxHQUFHLElBQUksR0FBRyxZQUFZLENBQUM7b0JBQ3BELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUMifQ==