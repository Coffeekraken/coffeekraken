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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kUGxlYXNhbnRDc3NDbGFzc25hbWVzTGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZFBsZWFzYW50Q3NzQ2xhc3NuYW1lc0xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLDRCQUE0QixNQUFNLDhDQUE4QyxDQUFDO0FBMkJ4RixNQUFNLENBQUMsT0FBTyxVQUFVLCtCQUErQixDQUNuRCxRQUE0RDtJQUU1RCxRQUFRLG1CQUNKLFFBQVEsRUFBRSxRQUFRLElBQ2YsUUFBUSxDQUNkLENBQUM7SUFDRixtQkFBbUIsQ0FDZiwrSEFBK0gsRUFDL0gsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNMLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxhQUFhLEdBQUcsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxFQUNEO1FBQ0ksUUFBUSxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxRQUFRO1FBQzVCLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9