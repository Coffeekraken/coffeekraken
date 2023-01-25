"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
function default_1({ root, sharedData, postcssApi, settings, cacheDir, classmap, }) {
    var _a;
    if (!((_a = settings.compress) === null || _a === void 0 ? void 0 : _a.variables)) {
        return;
    }
    // console.log({
    //     group: 'postcssSugarPlugin',
    //     value: `<yellow>[postcssSugarPlugin]</yellow> Compressing variables`,
    // });
    root.walkDecls(/^--s\-/, (decl) => {
        decl.prop = s_theme_1.default.compressVarName(decl.prop);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLG1CQUF5QixFQUNyQixJQUFJLEVBQ0osVUFBVSxFQUNWLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsR0FDWDs7SUFDRyxJQUFJLENBQUMsQ0FBQSxNQUFBLFFBQVEsQ0FBQyxRQUFRLDBDQUFFLFNBQVMsQ0FBQSxFQUFFO1FBQy9CLE9BQU87S0FDVjtJQUVELGdCQUFnQjtJQUNoQixtQ0FBbUM7SUFDbkMsNEVBQTRFO0lBQzVFLE1BQU07SUFFTixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXBCRCw0QkFvQkMifQ==