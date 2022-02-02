import __expandPleasantCssClassname from './expandPleasantCssClassname';
export default function extractCssClassesNames(html, settings) {
    const finalSettings = Object.assign({ expandPleasantCssClassname: true, includeIds: false }, settings !== null && settings !== void 0 ? settings : {});
    let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
    if (finalSettings.includeIds) {
        reg = /(class|id)="[a-zA-Z0-9_\-:@\s]+"/gm;
    }
    const matches = html.match(reg);
    if (!matches)
        return [];
    let classesNames = [];
    // @ts-ignore
    matches.forEach((match) => {
        let classesStr = match.trim().replace('class="', '').replace('id="', '').replace('"', '');
        if (settings === null || settings === void 0 ? void 0 : settings.expandPleasantCssClassname) {
            classesStr = __expandPleasantCssClassname(classesStr);
        }
        classesNames = [...classesNames, ...classesStr.split(' ')].map(l => l.trim());
    });
    return classesNames;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdENzc0NsYXNzZXNOYW1lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RDc3NDbGFzc2VzTmFtZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyw0QkFBNEIsTUFBTSw4QkFBOEIsQ0FBQztBQWdDeEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxzQkFBc0IsQ0FBQyxJQUFZLEVBQUUsUUFBbUQ7SUFDNUcsTUFBTSxhQUFhLG1CQUNmLDBCQUEwQixFQUFFLElBQUksRUFDaEMsVUFBVSxFQUFFLEtBQUssSUFDZCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ3BCLENBQUE7SUFFRCxJQUFJLEdBQUcsR0FBRywrQkFBK0IsQ0FBQztJQUMxQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7UUFDMUIsR0FBRyxHQUFHLG9DQUFvQyxDQUFDO0tBQzlDO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXhCLElBQUksWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVoQyxhQUFhO0lBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUxRixJQUFJLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSwwQkFBMEIsRUFBRTtZQUN0QyxVQUFVLEdBQUcsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekQ7UUFFRCxZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUdsRixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUMifQ==