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
const SFile_1 = __importDefault(require("../fs/SFile"));
const SFindImportmapInterface_1 = __importDefault(require("./interface/SFindImportmapInterface"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function findImportmap(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const par = (deepMerge_1.default(SFindImportmapInterface_1.default.defaults(), params || {}));
        let foundFiles = [];
        // loop on potential folders
        for (let path of par.dirs) {
            // loop on potential names
            for (let name of par.names) {
                // check for file
                const filePath = `${path}/${name}`;
                if (fs_1.default.existsSync(filePath))
                    foundFiles.push(filePath);
            }
        }
        // mao to SFile if wanted
        if (par.SFile === true) {
            foundFiles = foundFiles.map((path) => {
                return new SFile_1.default(path);
            });
        }
        return foundFiles;
    });
}
exports.default = findImportmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEltcG9ydG1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbmRJbXBvcnRtYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBa0M7QUFDbEMsa0dBQTRFO0FBQzVFLG9FQUE4QztBQUM5Qyw0Q0FBc0I7QUErQnRCLFNBQThCLGFBQWEsQ0FDekMsTUFBc0M7O1FBRXRDLE1BQU0sR0FBRyxHQUF5QixDQUNoQyxtQkFBVyxDQUFDLGlDQUF5QixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FDaEUsQ0FBQztRQUVGLElBQUksVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUUzQiw0QkFBNEI7UUFDNUIsS0FBSyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ3pCLDBCQUEwQjtZQUMxQixLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQzFCLGlCQUFpQjtnQkFDakIsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ25DLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMxRDtTQUNGO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDdEIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUFBO0FBM0JELGdDQTJCQyJ9