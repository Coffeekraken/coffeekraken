"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_classmap_1 = __importDefault(require("@coffeekraken/s-classmap"));
function default_1({ root, sharedData, postcssApi, settings, cacheDir }) {
    if (!settings.classmap) {
        return;
    }
    const classmap = new s_classmap_1.default();
    classmap.applyOnAst(root);
    classmap.saveSync();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQW1EO0FBRW5ELG1CQUF5QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7SUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDcEIsT0FBTztLQUNWO0lBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7SUFDbkMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQVJELDRCQVFDIn0=