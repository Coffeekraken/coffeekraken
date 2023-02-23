import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';
import __expandPleasantCssClassname from '../../../shared/html/expandPleasantCssClassname';
export default function __expandPleasantCssClassnamesLive(settings) {
    settings = Object.assign({ afterFirst: undefined, rootNode: document }, settings);
    // [class*=":"]:not(code [class*=":"]):not(template [class*=":"]):not([s-scope] [class*=":"]:not(code [class*=":"]):not(template [class*=":"])),[class*="@"]:not(code [class*="@"]):not(template [class*="@"]):not([s-scope] [class*="@"]:not(code [class*="@"]):not(template [class*="@"]))
    __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
        const classesStr = $elm.getAttribute('class');
        const newClassesStr = __expandPleasantCssClassname(classesStr);
        __fastdom.mutate(() => {
            $elm.setAttribute('class', newClassesStr);
        });
    }, {
        afterFirst: settings.afterFirst,
        rootNode: settings === null || settings === void 0 ? void 0 : settings.rootNode,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLDRCQUE0QixNQUFNLGlEQUFpRCxDQUFDO0FBNkIzRixNQUFNLENBQUMsT0FBTyxVQUFVLGlDQUFpQyxDQUNyRCxRQUE0RDtJQUU1RCxRQUFRLG1CQUNKLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLFFBQVEsRUFBRSxRQUFRLElBQ2YsUUFBUSxDQUNkLENBQUM7SUFFRiw0UkFBNFI7SUFDNVIsbUJBQW1CLENBQ2YsK0hBQStILEVBQy9ILENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDTCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sYUFBYSxHQUFHLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUNEO1FBQ0ksVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1FBQy9CLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsUUFBUTtLQUMvQixDQUNKLENBQUM7QUFDTixDQUFDIn0=