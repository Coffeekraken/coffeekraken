"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const csso_1 = require("csso");
function default_1({ root, sharedData, settings, cacheDir }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
        // exports only for production target
        // if (!settings.exports) {
        //     // console.log(`<yellow>[export]</yellow> Exports <red>disabled</red>`);
        //     return;
        // }
        const css = root.toString();
        // console.log('CSS', root.toString());
        const exportMatches = [
            ...css.matchAll(/\/\*\!\sSEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\/([\s\S]*)\/\*\!\sSENDEXPORT:([a-zA-Z0-9_\/\.-]+)\s\*\//g),
        ];
        exportMatches.forEach((match) => {
            let exportPath = match[1], exportContent = match[2];
            // generate the output path
            // if a / or a . is found in the exportPath, use as it is,
            // otherwise if it's just an "id" like "welcome", save it into the "css" subdirectory
            let finalExportPath = exportPath;
            if (!finalExportPath.match(/\//)) {
                finalExportPath = `exports/${finalExportPath}`;
            }
            if (!finalExportPath.match(/\.css$/)) {
                finalExportPath += '.css';
            }
            console.log(`<yellow>[export]</yellow> Export "<cyan>${finalExportPath}</cyan>"`);
            if (settings.target === 'production') {
                exportContent = (0, csso_1.minify)(exportContent).css;
            }
            (0, writeFileSync_1.default)(`${settings.outDir}/${finalExportPath}`, exportContent);
        });
        if (exportMatches.length) {
            console.log(`<yellow>[export]</yellow> Purging exported css from main one...`);
            // removing all exported css
            let inExport = false;
            root.nodes = root.nodes.filter((node) => {
                if (node.type === 'comment' && node.text.trim().match(/SEXPORT:/)) {
                    inExport = true;
                    node.remove();
                    return false;
                }
                else if (node.type === 'comment' &&
                    node.text.trim().match(/SENDEXPORT:/)) {
                    inExport = false;
                    node.remove();
                    return false;
                }
                else if (inExport) {
                    node.remove();
                    return false;
                }
                return true;
            });
        }
        if (exportMatches.length) {
            console.log(`<green>[export]</green> Exports saved <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELDhGQUF3RTtBQUN4RSwrQkFBMEM7QUFFMUMsbUJBQStCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFOztRQUNuRSxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUVuQyxxQ0FBcUM7UUFDckMsMkJBQTJCO1FBQzNCLCtFQUErRTtRQUMvRSxjQUFjO1FBQ2QsSUFBSTtRQUVKLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1Qix1Q0FBdUM7UUFFdkMsTUFBTSxhQUFhLEdBQUc7WUFDbEIsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUNYLG1HQUFtRyxDQUN0RztTQUNKLENBQUM7UUFFRixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNyQixhQUFhLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdCLDJCQUEyQjtZQUMzQiwwREFBMEQ7WUFDMUQscUZBQXFGO1lBQ3JGLElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQztZQUVqQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsZUFBZSxHQUFHLFdBQVcsZUFBZSxFQUFFLENBQUM7YUFDbEQ7WUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsZUFBZSxJQUFJLE1BQU0sQ0FBQzthQUM3QjtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1AsMkNBQTJDLGVBQWUsVUFBVSxDQUN2RSxDQUFDO1lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLFlBQVksRUFBRTtnQkFDbEMsYUFBYSxHQUFHLElBQUEsYUFBUSxFQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUMvQztZQUVELElBQUEsdUJBQWUsRUFBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksZUFBZSxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxpRUFBaUUsQ0FDcEUsQ0FBQztZQUVGLDRCQUE0QjtZQUM1QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMvRCxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO3FCQUFNLElBQ0gsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO29CQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFDdkM7b0JBQ0UsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUFJLFFBQVEsRUFBRTtvQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsOEVBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixTQUFTLENBQ1osQ0FBQztTQUNMO0lBQ0wsQ0FBQztDQUFBO0FBL0VELDRCQStFQyJ9