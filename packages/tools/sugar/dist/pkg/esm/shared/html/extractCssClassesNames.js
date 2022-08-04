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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNEJBQTRCLE1BQU0sOEJBQThCLENBQUM7QUFnQ3hFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQUMsSUFBWSxFQUFFLFFBQW1EO0lBQzVHLE1BQU0sYUFBYSxtQkFDZiwwQkFBMEIsRUFBRSxJQUFJLEVBQ2hDLFVBQVUsRUFBRSxLQUFLLElBQ2QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNwQixDQUFBO0lBRUQsSUFBSSxHQUFHLEdBQUcsK0JBQStCLENBQUM7SUFDMUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO1FBQzFCLEdBQUcsR0FBRyxvQ0FBb0MsQ0FBQztLQUM5QztJQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUV4QixJQUFJLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFaEMsYUFBYTtJQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN0QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFMUYsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsMEJBQTBCLEVBQUU7WUFDdEMsVUFBVSxHQUFHLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFHbEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDIn0=