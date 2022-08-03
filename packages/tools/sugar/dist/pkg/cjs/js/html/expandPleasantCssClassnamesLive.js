"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastdom_1 = __importDefault(require("fastdom"));
const expandPleasantCssClassname_1 = __importDefault(require("../../shared/html/expandPleasantCssClassname"));
const querySelectorLive_1 = __importDefault(require("../dom/query/querySelectorLive"));
function expandPleasantCssClassnamesLive(settings) {
    settings = Object.assign({ afterFirst: undefined, rootNode: document }, settings);
    (0, querySelectorLive_1.default)('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBQ2hDLDhHQUF3RjtBQUN4Rix1RkFBaUU7QUEyQmpFLFNBQXdCLCtCQUErQixDQUNuRCxRQUE0RDtJQUU1RCxRQUFRLG1CQUNKLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLFFBQVEsRUFBRSxRQUFRLElBQ2YsUUFBUSxDQUNkLENBQUM7SUFDRixJQUFBLDJCQUFtQixFQUNmLCtIQUErSCxFQUMvSCxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ0wsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLGFBQWEsR0FBRyxJQUFBLG9DQUE0QixFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELGlCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtRQUMvQixRQUFRLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVE7S0FDL0IsQ0FDSixDQUFDO0FBQ04sQ0FBQztBQXRCRCxrREFzQkMifQ==