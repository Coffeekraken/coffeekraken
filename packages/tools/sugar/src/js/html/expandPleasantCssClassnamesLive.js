import __querySelectorLive from '../dom/query/querySelectorLive';
import __expandPleasantCssClassname from '../../shared/html/expandPleasantCssClassname';
export default function expandPleasantCssClassnamesLive(settings) {
    settings = Object.assign({ rootNode: document }, settings);
    __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
        const classesStr = $elm.getAttribute('class');
        const newClassesStr = __expandPleasantCssClassname(classesStr);
        $elm.setAttribute('class', newClassesStr);
    }, {
        rootNode: settings === null || settings === void 0 ? void 0 : settings.rootNode,
        once: false,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kUGxlYXNhbnRDc3NDbGFzc25hbWVzTGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZFBsZWFzYW50Q3NzQ2xhc3NuYW1lc0xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLDRCQUE0QixNQUFNLDhDQUE4QyxDQUFDO0FBMkJ4RixNQUFNLENBQUMsT0FBTyxVQUFVLCtCQUErQixDQUFDLFFBQTREO0lBQ2hILFFBQVEsbUJBQ0osUUFBUSxFQUFFLFFBQVEsSUFDZixRQUFRLENBQ2QsQ0FBQztJQUNGLG1CQUFtQixDQUNmLCtIQUErSCxFQUMvSCxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ0wsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QyxDQUFDLEVBQ0Q7UUFDSSxRQUFRLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVE7UUFDNUIsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUNKLENBQUM7QUFDTixDQUFDIn0=