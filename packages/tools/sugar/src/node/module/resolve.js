"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const ResolveSettingsInterface_1 = __importDefault(require("./interface/ResolveSettingsInterface"));
const path_1 = __importDefault(require("path"));
const file_1 = __importDefault(require("../is/file"));
const folder_1 = __importDefault(require("../is/folder"));
function resolve(module, settings) {
    const set = deepMerge_1.default(Object.assign({}, ResolveSettingsInterface_1.default.defaults()), settings || {});
    // loop on directories
    for (let i = 0; i < set.dirs.length; i++) {
        const dirPath = set.dirs[i];
        const absPath = path_1.default.resolve(dirPath, module);
        // check if the file exists
        if (file_1.default(absPath)) {
            return absPath;
        }
        else if (folder_1.default(absPath) && file_1.default(`${absPath}/package.json`)) {
            const packageJson = require(`${absPath}/package.json`);
            // check each fields one after the other
            for (let j = 0; j < set.fields.length; j++) {
                const field = set.fields[j];
                if (!packageJson[field])
                    continue;
                const filePath = path_1.default.resolve(absPath, packageJson[field]);
                if (!file_1.default(filePath))
                    continue;
                return filePath;
            }
        }
        else {
            // check extensions free path
            for (let j = 0; j < set.extensions.length; j++) {
                const ext = set.extensions[j];
                if (file_1.default(`${absPath}.${ext}`)) {
                    return `${absPath}.${ext}`;
                }
            }
        }
        // nothing found
        throw new Error(`Sorry but the requested module "<yellow>${module}</yellow>" cannot be resolved correctly...`);
    }
}
exports.default = resolve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBOEM7QUFDOUMsb0dBQThFO0FBRTlFLGdEQUEwQjtBQUMxQixzREFBa0M7QUFDbEMsMERBQXNDO0FBMkJ0QyxTQUF3QixPQUFPLENBQzdCLE1BQWMsRUFDZCxRQUFvQztJQUVwQyxNQUFNLEdBQUcsR0FBcUIsbUJBQVcsbUJBRWxDLGtDQUEwQixDQUFDLFFBQVEsRUFBRSxHQUUxQyxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7SUFFRixzQkFBc0I7SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxPQUFPLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsMkJBQTJCO1FBQzNCLElBQUksY0FBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO2FBQU0sSUFBSSxnQkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQVEsQ0FBQyxHQUFHLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDckUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsT0FBTyxlQUFlLENBQUMsQ0FBQztZQUN2RCx3Q0FBd0M7WUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztvQkFBRSxTQUFTO2dCQUNsQyxNQUFNLFFBQVEsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGNBQVEsQ0FBQyxRQUFRLENBQUM7b0JBQUUsU0FBUztnQkFDbEMsT0FBTyxRQUFRLENBQUM7YUFDakI7U0FDRjthQUFNO1lBQ0wsNkJBQTZCO1lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxjQUFRLENBQUMsR0FBRyxPQUFPLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFDakMsT0FBTyxHQUFHLE9BQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQztpQkFDNUI7YUFDRjtTQUNGO1FBRUQsZ0JBQWdCO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2IsMkNBQTJDLE1BQU0sNENBQTRDLENBQzlGLENBQUM7S0FDSDtBQUNILENBQUM7QUEzQ0QsMEJBMkNDIn0=