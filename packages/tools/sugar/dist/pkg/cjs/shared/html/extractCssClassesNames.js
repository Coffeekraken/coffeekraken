"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expandPleasantCssClassname_1 = __importDefault(require("./expandPleasantCssClassname"));
function extractCssClassesNames(html, settings) {
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
            classesStr = (0, expandPleasantCssClassname_1.default)(classesStr);
        }
        classesNames = [...classesNames, ...classesStr.split(' ')].map(l => l.trim());
    });
    return classesNames;
}
exports.default = extractCssClassesNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEZBQXdFO0FBZ0N4RSxTQUF3QixzQkFBc0IsQ0FBQyxJQUFZLEVBQUUsUUFBbUQ7SUFDNUcsTUFBTSxhQUFhLG1CQUNmLDBCQUEwQixFQUFFLElBQUksRUFDaEMsVUFBVSxFQUFFLEtBQUssSUFDZCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ3BCLENBQUE7SUFFRCxJQUFJLEdBQUcsR0FBRywrQkFBK0IsQ0FBQztJQUMxQyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7UUFDMUIsR0FBRyxHQUFHLG9DQUFvQyxDQUFDO0tBQzlDO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXhCLElBQUksWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVoQyxhQUFhO0lBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3RCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUxRixJQUFJLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSwwQkFBMEIsRUFBRTtZQUN0QyxVQUFVLEdBQUcsSUFBQSxvQ0FBNEIsRUFBQyxVQUFVLENBQUMsQ0FBQztTQUN6RDtRQUVELFlBQVksR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFFLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBR2xGLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQS9CRCx5Q0ErQkMifQ==