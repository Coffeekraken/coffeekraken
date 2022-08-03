import __fastdom from 'fastdom';
import __expandPleasantCssClassname from '../../shared/html/expandPleasantCssClassname';
import __querySelectorLive from '../dom/query/querySelectorLive';
export default function expandPleasantCssClassnamesLive(settings) {
    settings = Object.assign({ afterFirst: undefined, rootNode: document }, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLDRCQUE0QixNQUFNLDhDQUE4QyxDQUFDO0FBQ3hGLE9BQU8sbUJBQW1CLE1BQU0sZ0NBQWdDLENBQUM7QUEyQmpFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsK0JBQStCLENBQ25ELFFBQTREO0lBRTVELFFBQVEsbUJBQ0osVUFBVSxFQUFFLFNBQVMsRUFDckIsUUFBUSxFQUFFLFFBQVEsSUFDZixRQUFRLENBQ2QsQ0FBQztJQUNGLG1CQUFtQixDQUNmLCtIQUErSCxFQUMvSCxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ0wsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtRQUMvQixRQUFRLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVE7S0FDL0IsQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9