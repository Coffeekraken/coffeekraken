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
 * @example         js
 * import expandPleasantCssClassname from '@coffeekraken/sugar/shared/html/expandPleasantCssClassname';
 * expandPleasantCssClassname('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function expandPleasantCssClassname(classesStr) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kUGxlYXNhbnRDc3NDbGFzc25hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBhbmRQbGVhc2FudENzc0NsYXNzbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLDBCQUEwQixDQUFDLFVBQWtCO0lBQ2pFLE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVsQyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUV0QixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7WUFDOUIsWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLE9BQU87U0FDVjtRQUVELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7WUFDckIsSUFBSSxZQUFZLEtBQUssRUFBRTtnQkFBRSxJQUFJLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQztZQUN6RCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO2FBQU07WUFDSCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQ3RCLElBQUksWUFBWSxLQUFLLEVBQUU7Z0JBQUUsSUFBSSxHQUFHLFVBQVUsR0FBRyxZQUFZLENBQUM7WUFDMUQsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsSUFBSSxHQUFHLFVBQVUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQyxJQUFJLFlBQVksS0FBSyxFQUFFO3dCQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDO29CQUNwRCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=