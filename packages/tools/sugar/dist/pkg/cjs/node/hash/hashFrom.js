"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const npm_1 = require("@coffeekraken/sugar/npm");
const object_1 = require("@coffeekraken/sugar/object");
const crypto_1 = __importDefault(require("crypto"));
const fs_2 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
function __hashFrom(sources, settings) {
    const hashes = [];
    const finalSettings = Object.assign({ algo: 'sha256', digest: 'base64' }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let source of sources) {
        // plain object
        if (typeof source !== 'string') {
            hashes.push((0, object_1.__objectHash)(source));
            continue;
        }
        // package
        if (typeof source === 'string' && !source.startsWith('/')) {
            const path = (0, npm_1.__packagePath)(source);
            if (path) {
                hashes.push((0, fs_1.__folderHash)(path));
                continue;
            }
        }
        // directory
        if (typeof source === 'string' && (0, is_1.__isDirectory)(source)) {
            hashes.push((0, fs_1.__folderHash)(source));
            continue;
        }
        // absolute file
        if (typeof source === 'string' && fs_2.default.existsSync(source)) {
            hashes.push((0, fs_1.__fileHash)(source));
            continue;
        }
        // glob
        if (typeof source === 'string' && (0, is_1.__isGlob)(source)) {
            const files = glob_1.default.sync(source);
            for (let filePath of files) {
                if ((0, is_1.__isDirectory)(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push((0, fs_1.__folderHash)(filePath));
                }
                else {
                    hashes.push((0, fs_1.__fileHash)(filePath));
                }
            }
            continue;
        }
        // otherwise it's an unsupported source
        console.error(source);
        throw new Error(`<red>[__hashFrom]</red> The logged source above is not a supported one...`);
    }
    // create the final hash
    const hash = crypto_1.default
        .createHash(finalSettings.algo)
        .update(hashes.join('-'))
        .digest(finalSettings.digest);
    // return the hash
    return hash;
}
exports.default = __hashFrom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQWtFO0FBQ2xFLCtDQUFpRTtBQUNqRSxpREFBd0Q7QUFDeEQsdURBQTBEO0FBQzFELG9EQUF3RDtBQUN4RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBMEMxQixTQUF3QixVQUFVLENBQzlCLE9BQXlCLEVBQ3pCLFFBQXFDO0lBRXJDLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUU1QixNQUFNLGFBQWEsbUJBQ2YsSUFBSSxFQUFFLFFBQVEsRUFDZCxNQUFNLEVBQUUsUUFBUSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUN4QixlQUFlO1FBQ2YsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxVQUFVO1FBQ1YsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sSUFBSSxHQUFHLElBQUEsbUJBQWEsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsaUJBQVksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxTQUFTO2FBQ1o7U0FDSjtRQUVELFlBQVk7UUFDWixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxJQUFBLGtCQUFhLEVBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLGlCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsZUFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEMsU0FBUztTQUNaO1FBRUQsT0FBTztRQUNQLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUEsYUFBUSxFQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELE1BQU0sS0FBSyxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksSUFBQSxrQkFBYSxFQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QixzQ0FBc0M7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxpQkFBWSxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxlQUFVLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDckM7YUFDSjtZQUNELFNBQVM7U0FDWjtRQUVELHVDQUF1QztRQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQ1gsMkVBQTJFLENBQzlFLENBQUM7S0FDTDtJQUVELHdCQUF3QjtJQUN4QixNQUFNLElBQUksR0FBRyxnQkFBUTtTQUNoQixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWxDLGtCQUFrQjtJQUNsQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBckVELDZCQXFFQyJ9