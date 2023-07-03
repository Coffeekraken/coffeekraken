"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expandPleasantCssClassname_1 = __importDefault(require("./expandPleasantCssClassname"));
function __extractCssClassesNames(html, settings) {
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
            classesStr = (0, expandPleasantCssClassname_1.default)(classesStr);
        }
        classesNames = [...classesNames, ...classesStr.split(' ')].map((l) => l.trim());
    });
    return classesNames;
}
exports.default = __extractCssClassesNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEZBQXdFO0FBa0N4RSxTQUF3Qix3QkFBd0IsQ0FDNUMsSUFBWSxFQUNaLFFBQW1EO0lBRW5ELE1BQU0sYUFBYSxtQkFDZiwwQkFBMEIsRUFBRSxJQUFJLEVBQ2hDLFVBQVUsRUFBRSxLQUFLLElBQ2QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksR0FBRyxHQUFHLCtCQUErQixDQUFDO0lBQzFDLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtRQUMxQixHQUFHLEdBQUcsb0NBQW9DLENBQUM7S0FDOUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFeEIsSUFBSSxZQUFZLEdBQWEsRUFBRSxDQUFDO0lBRWhDLGFBQWE7SUFDYixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDdEIsSUFBSSxVQUFVLEdBQUcsS0FBSzthQUNqQixJQUFJLEVBQUU7YUFDTixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQzthQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUNuQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXRCLElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLDBCQUEwQixFQUFFO1lBQ3RDLFVBQVUsR0FBRyxJQUFBLG9DQUE0QixFQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDakUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNYLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUF0Q0QsMkNBc0NDIn0=