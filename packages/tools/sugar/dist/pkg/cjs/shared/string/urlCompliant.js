"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simplifySpecialChars_js_1 = __importDefault(require("./simplifySpecialChars.js"));
function __urlCompliant(str, settings) {
    settings = Object.assign({ exclude: [] }, (settings !== null && settings !== void 0 ? settings : {}));
    // spaces
    str = str.replace(/\s/gm, '-');
    // special characters
    str = (0, simplifySpecialChars_js_1.default)(str);
    // replace characters like /, etc...
    const dict = {
        '\\': '-',
        '@': '',
        '(': '-',
        ')': '-',
        '[': '-',
        ']': '-',
        ',': '-',
        ':': '-',
    };
    settings.exclude.forEach((char) => {
        delete dict[char];
    });
    Object.keys(dict).forEach((char) => {
        str = str.split(char).join(dict[char]);
    });
    // first and last characters + multiple ---
    str = str.replace(/\.{2,999}/gm, '.');
    str = str.replace(/^-{1,999}/gm, '');
    str = str.replace(/-{1,999}$/gm, '');
    str = str.replace(/-{2,999}/gm, '-');
    // lowercase
    str = str.toLowerCase();
    return str;
}
exports.default = __urlCompliant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0ZBQStEO0FBK0IvRCxTQUF3QixjQUFjLENBQ2xDLEdBQVcsRUFDWCxRQUFnQztJQUVoQyxRQUFRLG1CQUNKLE9BQU8sRUFBRSxFQUFFLElBQ1IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFNBQVM7SUFDVCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFL0IscUJBQXFCO0lBQ3JCLEdBQUcsR0FBRyxJQUFBLGlDQUFzQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLG9DQUFvQztJQUNwQyxNQUFNLElBQUksR0FBRztRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBRUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDL0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsMkNBQTJDO0lBQzNDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVyQyxZQUFZO0lBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUV4QixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUEzQ0QsaUNBMkNDIn0=