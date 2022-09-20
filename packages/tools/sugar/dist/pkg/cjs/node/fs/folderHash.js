"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const token_1 = require("@coffeekraken/sugar/token");
const fs_2 = __importDefault(require("fs"));
const sha256_1 = __importDefault(require("../../shared/crypto/sha256"));
function __folderHash(folderPath, settings = {}) {
    // replace tokens
    folderPath = (0, token_1.__replaceTokens)(folderPath);
    settings = (0, object_1.__deepMerge)({
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    const paths = [];
    function readDir(dir) {
        const files = fs_2.default.readdirSync(dir);
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
        filesHashes.push((0, fs_1.__fileHash)(path, settings));
    });
    return sha256_1.default.encrypt(filesHashes.join('-'));
}
exports.default = __folderHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW9EO0FBQ3BELCtDQUF1RDtBQUN2RCx1REFBeUQ7QUFDekQscURBQTREO0FBRTVELDRDQUFzQjtBQUN0Qix3RUFBa0Q7QUF3Q2xELFNBQXdCLFlBQVksQ0FDaEMsVUFBa0IsRUFDbEIsV0FBeUMsRUFBRTtJQUUzQyxpQkFBaUI7SUFDakIsVUFBVSxHQUFHLElBQUEsdUJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUV6QyxRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUNsQjtRQUNJLFNBQVMsRUFBRSxJQUFJO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsS0FBSztTQUNmO0tBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFDRixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsU0FBUyxPQUFPLENBQUMsR0FBRztRQUNoQixNQUFNLEtBQUssR0FBRyxZQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksSUFBQSxrQkFBYSxFQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQzNELE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDeEM7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sV0FBVyxHQUFhLEVBQUUsQ0FBQztJQUVqQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxJQUFBLGtCQUFhLEVBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUNoQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUEsZUFBVSxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQXhDRCwrQkF3Q0MifQ==