import __querySelectorLive from '../dom/query/querySelectorLive';
import __expandPleasantCssClassname from '../../shared/html/expandPleasantCssClassname';
/**
 * @name            expandPleasantCssClassnamesLive
 * @namespace       ks.html
 * @type            Function
 * @platform        js
 * @platform        ts
 * @status          beta
 *
 * This function allows you to convert "colon" classnames like "s-something:cool @desktop something"
 * to comprehensive classnames for css like "s-something s-something--cool something___desktop", etc...
 * This function do this live when detecting a new node in the page, etc...
 *
 * @example         js
 * import expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
 * expandPleasantCssClassnamesLive();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function expandPleasantCssClassnamesLive() {
    __querySelectorLive('[class*=":"],[class*="@"]', ($elm) => {
        const classesStr = $elm.getAttribute('class');
        const newClassesStr = __expandPleasantCssClassname(classesStr);
        $elm.setAttribute('class', newClassesStr);
    }, {
        once: false
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kUGxlYXNhbnRDc3NDbGFzc25hbWVzTGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZFBsZWFzYW50Q3NzQ2xhc3NuYW1lc0xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLDRCQUE0QixNQUFNLDhDQUE4QyxDQUFDO0FBRXhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLCtCQUErQjtJQUNuRCxtQkFBbUIsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxhQUFhLEdBQUcsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxFQUFFO1FBQ0MsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDLENBQUM7QUFDUCxDQUFDIn0=