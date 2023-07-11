import __expandPleasantCssClassname from './expandPleasantCssClassname.js';
export default function __extractCssClassesNames(html, settings) {
    const finalSettings = Object.assign({ expandPleasantCssClassname: true, includeIds: false }, (settings !== null && settings !== void 0 ? settings : {}));
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
        let classesStr = match
            .trim()
            .replace('class="', '')
            .replace('id="', '')
            .replace('"', '');
        if (settings === null || settings === void 0 ? void 0 : settings.expandPleasantCssClassname) {
            classesStr = __expandPleasantCssClassname(classesStr);
        }
        classesNames = [...classesNames, ...classesStr.split(' ')].map((l) => l.trim());
    });
    return classesNames;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNEJBQTRCLE1BQU0saUNBQWlDLENBQUM7QUFrQzNFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsd0JBQXdCLENBQzVDLElBQVksRUFDWixRQUFtRDtJQUVuRCxNQUFNLGFBQWEsbUJBQ2YsMEJBQTBCLEVBQUUsSUFBSSxFQUNoQyxVQUFVLEVBQUUsS0FBSyxJQUNkLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLEdBQUcsR0FBRywrQkFBK0IsQ0FBQztJQUMxQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7UUFDMUIsR0FBRyxHQUFHLG9DQUFvQyxDQUFDO0tBQzlDO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXhCLElBQUksWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVoQyxhQUFhO0lBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RCLElBQUksVUFBVSxHQUFHLEtBQUs7YUFDakIsSUFBSSxFQUFFO2FBQ04sT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7YUFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7YUFDbkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0QixJQUFJLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSwwQkFBMEIsRUFBRTtZQUN0QyxVQUFVLEdBQUcsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekQ7UUFFRCxZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNqRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ1gsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQyJ9