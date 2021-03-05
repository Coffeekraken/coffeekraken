"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("../is/path"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const unified_1 = __importDefault(require("unified"));
function extractImport(stringOrFilePath, settings) {
    const set = deepMerge_1.default({
        import: true,
        require: true
    }, settings || {});
    let content = stringOrFilePath;
    // check if is a file
    if (path_1.default(stringOrFilePath)) {
        content = fs_1.default.readFileSync(stringOrFilePath);
    }
    // imports
    if (set.import) {
        const importReg = /import\s(.*)\sfrom\s['"´](.*)['"´];?/gm;
        const importMatches = content.match(importReg);
        const imports = [];
        console.log(unified_1.default.parse(importMatches.join('\n')));
        importMatches.forEach((importString) => {
            const splits = importString
                .split(/import|from|;/)
                .filter((l) => l.trim() !== '')
                .map((l) => l.trim());
            console.log(splits);
            // imports.push({
            //     type: 'import',
            // })
        });
    }
    return [];
}
exports.default = extractImport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RJbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBa0M7QUFDbEMsNENBQXNCO0FBRXRCLG9FQUE4QztBQUM5QyxzREFBZ0M7QUErQmhDLFNBQXdCLGFBQWEsQ0FDbkMsZ0JBQWdCLEVBQ2hCLFFBQTBDO0lBRTFDLE1BQU0sR0FBRyxHQUEyQixtQkFBVyxDQUM3QztRQUNFLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLElBQUk7S0FDZCxFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLGdCQUFnQixDQUFDO0lBRS9CLHFCQUFxQjtJQUNyQixJQUFJLGNBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzlCLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDL0M7SUFFRCxVQUFVO0lBQ1YsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ2QsTUFBTSxTQUFTLEdBQUcsd0NBQXdDLENBQUM7UUFFM0QsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvQyxNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDckMsTUFBTSxNQUFNLEdBQUcsWUFBWTtpQkFDeEIsS0FBSyxDQUFDLGVBQWUsQ0FBQztpQkFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2lCQUM5QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEIsaUJBQWlCO1lBQ2pCLHNCQUFzQjtZQUV0QixLQUFLO1FBQ1AsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQTVDRCxnQ0E0Q0MifQ==