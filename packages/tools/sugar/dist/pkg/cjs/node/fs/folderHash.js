"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sha256_1 = __importDefault(require("../../shared/crypt/sha256"));
const is_1 = require("@coffeekraken/sugar/is");
const fs_2 = require("@coffeekraken/sugar/fs");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
function __folderHash(folderPath, settings = {}) {
    settings = (0, deepMerge_1.default)({
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
            if (settings.recursive && (0, is_1.__isDirectory)(`${dir}/${filePath}`)) {
                return readDir(`${dir}/${filePath}`);
            }
            paths.push(`${dir}/${filePath}`);
        });
    }
    readDir(folderPath);
    const filesHashes = [];
    paths.forEach((path) => {
        if ((0, is_1.__isDirectory)(path))
            return;
        filesHashes.push((0, fs_2.__fileHash)(path, settings));
    });
    return sha256_1.default.encrypt(filesHashes.join('-'));
}
exports.default = __folderHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNENBQXNCO0FBQ3RCLHVFQUFpRDtBQUNqRCwrQ0FBdUQ7QUFDdkQsK0NBQW9EO0FBQ3BELDRGQUFzRTtBQXlDdEUsU0FBd0IsWUFBWSxDQUNoQyxVQUFrQixFQUNsQixXQUF5QyxFQUFFO0lBRTNDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksU0FBUyxFQUFFLElBQUk7UUFDZixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxLQUFLO1NBQ2Y7S0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUUzQixTQUFTLE9BQU8sQ0FBQyxHQUFHO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLFlBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3ZCLElBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxJQUFBLGtCQUFhLEVBQUMsR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRTtnQkFDM0QsT0FBTyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQzthQUN4QztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO0lBRWpDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuQixJQUFJLElBQUEsa0JBQWEsRUFBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ2hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBQSxlQUFVLEVBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLGdCQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBckNELCtCQXFDQyJ9