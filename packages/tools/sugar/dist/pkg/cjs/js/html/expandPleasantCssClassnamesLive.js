"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastdom_1 = __importDefault(require("fastdom"));
const expandPleasantCssClassname_1 = __importDefault(require("../../shared/html/expandPleasantCssClassname"));
const dom_1 = require("@coffeekraken/sugar/dom");
function expandPleasantCssClassnamesLive(settings) {
    settings = Object.assign({ afterFirst: undefined, rootNode: document }, settings);
    // [class*=":"]:not(code [class*=":"]):not(template [class*=":"]):not([s-scope] [class*=":"]:not(code [class*=":"]):not(template [class*=":"])),[class*="@"]:not(code [class*="@"]):not(template [class*="@"]):not([s-scope] [class*="@"]:not(code [class*="@"]):not(template [class*="@"]))
    (0, dom_1.__querySelectorLive)('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
        const classesStr = $elm.getAttribute('class');
        const newClassesStr = (0, expandPleasantCssClassname_1.default)(classesStr);
        fastdom_1.default.mutate(() => {
            $elm.setAttribute('class', newClassesStr);
        });
    }, {
        afterFirst: settings.afterFirst,
        rootNode: settings === null || settings === void 0 ? void 0 : settings.rootNode,
    });
}
exports.default = expandPleasantCssClassnamesLive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBQ2hDLDhHQUF3RjtBQUN4RixpREFBOEQ7QUEyQjlELFNBQXdCLCtCQUErQixDQUNuRCxRQUE0RDtJQUU1RCxRQUFRLG1CQUNKLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLFFBQVEsRUFBRSxRQUFRLElBQ2YsUUFBUSxDQUNkLENBQUM7SUFFRiw0UkFBNFI7SUFDNVIsSUFBQSx5QkFBbUIsRUFDZiwrSEFBK0gsRUFDL0gsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNMLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxhQUFhLEdBQUcsSUFBQSxvQ0FBNEIsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQ0Q7UUFDSSxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7UUFDL0IsUUFBUSxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxRQUFRO0tBQy9CLENBQ0osQ0FBQztBQUNOLENBQUM7QUF4QkQsa0RBd0JDIn0=