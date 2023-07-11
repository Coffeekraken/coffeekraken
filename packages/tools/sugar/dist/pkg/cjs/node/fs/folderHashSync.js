"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_js_1 = __importDefault(require("../../shared/object/deepMerge.js"));
const isDirectory_js_1 = __importDefault(require("../is/isDirectory.js"));
const fileHashSync_js_1 = __importDefault(require("./fileHashSync.js"));
const fs_1 = __importDefault(require("fs"));
const sha256_js_1 = __importDefault(require("../../shared/crypto/sha256.js"));
function __folderHashSync(folderPath, settings = {}) {
    settings = (0, deepMerge_js_1.default)({
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    const paths = [];
    function readDir(dir) {
        const files = fs_1.default.readdirSync(dir);
        files.forEach((filePath) => {
            if (settings.recursive && (0, isDirectory_js_1.default)(`${dir}/${filePath}`)) {
                return readDir(`${dir}/${filePath}`);
            }
            paths.push(`${dir}/${filePath}`);
        });
    }
    readDir(folderPath);
    const filesHashes = [];
    paths.forEach((path) => {
        if ((0, isDirectory_js_1.default)(path))
            return;
        filesHashes.push((0, fileHashSync_js_1.default)(path, settings));
    });
    return sha256_js_1.default.encrypt(filesHashes.join('-'));
}
exports.default = __folderHashSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0ZBQTJEO0FBQzNELDBFQUFpRDtBQUNqRCx3RUFBK0M7QUFHL0MsNENBQXNCO0FBQ3RCLDhFQUFxRDtBQTBDckQsU0FBd0IsZ0JBQWdCLENBQ3BDLFVBQWtCLEVBQ2xCLFdBQXlDLEVBQUU7SUFFM0MsUUFBUSxHQUFHLElBQUEsc0JBQVcsRUFDbEI7UUFDSSxTQUFTLEVBQUUsSUFBSTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEtBQUs7U0FDZjtLQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO0lBRTNCLFNBQVMsT0FBTyxDQUFDLEdBQUc7UUFDaEIsTUFBTSxLQUFLLEdBQUcsWUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxRQUFRLENBQUMsU0FBUyxJQUFJLElBQUEsd0JBQWEsRUFBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUMzRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVwQixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFFakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25CLElBQUksSUFBQSx3QkFBYSxFQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFDaEMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFBLHlCQUFjLEVBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLG1CQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBckNELG1DQXFDQyJ9