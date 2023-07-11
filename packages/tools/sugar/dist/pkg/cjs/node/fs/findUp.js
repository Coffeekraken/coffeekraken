"use strict";
// @ts-nocheck
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
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const isGlob_js_1 = __importDefault(require("../../shared/is/isGlob.js"));
function __findUp(search, settings) {
    settings = Object.assign({ symlinks: true, cwd: process.cwd(), stopWhenFound: true, SFile: true }, settings);
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const cwd = settings.cwd;
        let currentPath = cwd.split('/').filter((p) => p.trim() !== '');
        let foundedFiles = [];
        while (currentPath.length > 0) {
            const path = `/${currentPath.join('/')}`;
            if ((0, isGlob_js_1.default)(search)) {
                let files = glob_1.default.sync(search, {
                    cwd: path,
                    symlinks: settings.symlinks,
                });
                if (files && files.length) {
                    files = files.map((f) => {
                        return `${path}/${f}`;
                    });
                    foundedFiles = [...foundedFiles, ...files];
                }
            }
            else if (fs_1.default.existsSync(`${path}/${search}`)) {
                foundedFiles.push(`${path}/${search}`);
            }
            // check if we need to stop when found
            if (settings.stopWhenFound && foundedFiles.length) {
                break;
            }
            // update the currentPath
            currentPath = currentPath.slice(0, -1);
        }
        if (settings.SFile === true) {
            // wrap into an SFile
            foundedFiles = foundedFiles.map((path) => {
                return new s_file_1.default(path);
            });
        }
        // athe end
        return resolve(foundedFiles);
    }));
}
exports.default = __findUp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtFQUEyQztBQUMzQyxrRkFBMEQ7QUFDMUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiwwRUFBaUQ7QUFvQ2pELFNBQXdCLFFBQVEsQ0FDNUIsTUFBYyxFQUNkLFFBQXlCO0lBRXpCLFFBQVEsbUJBQ0osUUFBUSxFQUFFLElBQUksRUFDZCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNsQixhQUFhLEVBQUUsSUFBSSxFQUNuQixLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3pCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXRCLE9BQU8sV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFFekMsSUFBSSxJQUFBLG1CQUFRLEVBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksS0FBSyxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUM1QixHQUFHLEVBQUUsSUFBSTtvQkFDVCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7aUJBQzlCLENBQUMsQ0FBQztnQkFDSCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN2QixLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNwQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztvQkFDSCxZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO2lCQUM5QzthQUNKO2lCQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUM3QyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDMUM7WUFDRCxzQ0FBc0M7WUFDdEMsSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLE1BQU07YUFDVDtZQUNELHlCQUF5QjtZQUN6QixXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUVELElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekIscUJBQXFCO1lBQ3JCLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxnQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxXQUFXO1FBQ1gsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUF0REQsMkJBc0RDIn0=