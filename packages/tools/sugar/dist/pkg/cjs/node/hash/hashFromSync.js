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
function __hashFromSync(sources, settings) {
    const hashes = [];
    const finalSettings = Object.assign({ algo: 'sha256', digest: 'base64' }, (settings !== null && settings !== void 0 ? settings : {}));
    let hash;
    for (let source of sources) {
        // plain object
        if (typeof source !== 'string') {
            hashes.push((0, object_1.__objectHash)(source));
            continue;
        }
        // package
        if (!source.startsWith('/') && source.match(/^[a-zA-Z-_\/\@]+$/)) {
            const path = (0, npm_1.__packagePathSync)(source);
            if (path) {
                hashes.push((0, fs_1.__folderHashSync)(path));
                continue;
            }
        }
        // directory
        if ((0, is_1.__isDirectory)(source)) {
            hashes.push((0, fs_1.__folderHashSync)(source));
            continue;
        }
        // absolute file
        if (fs_2.default.existsSync(source)) {
            hashes.push((0, fs_1.__fileHashSync)(source));
            continue;
        }
        // glob
        if ((0, is_1.__isGlob)(source)) {
            const files = __glob.sync(source);
            for (let filePath of files) {
                if ((0, is_1.__isDirectory)(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push((0, fs_1.__folderHashSync)(filePath));
                }
                else {
                    hashes.push((0, fs_1.__fileHashSync)(filePath));
                }
            }
            continue;
        }
        // simple string
        hashes.push(source);
    }
    // create the final hash
    if (hashes.length) {
        hash = crypto_1.default
            .createHash(finalSettings.algo)
            .update(hashes.join('-'))
            .digest(finalSettings.digest);
    }
    // return the hash
    return hash;
}
exports.default = __hashFromSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQTBFO0FBQzFFLCtDQUFpRTtBQUNqRSxpREFBNEQ7QUFDNUQsdURBQTBEO0FBQzFELG9EQUF3RDtBQUN4RCw0Q0FBc0I7QUE0Q3RCLFNBQXdCLGNBQWMsQ0FDbEMsT0FBeUIsRUFDekIsUUFBcUM7SUFFckMsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLE1BQU0sYUFBYSxtQkFDZixJQUFJLEVBQUUsUUFBUSxFQUNkLE1BQU0sRUFBRSxRQUFRLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDO0lBRVQsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDeEIsZUFBZTtRQUNmLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEMsU0FBUztTQUNaO1FBRUQsVUFBVTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUM5RCxNQUFNLElBQUksR0FBRyxJQUFBLHVCQUFpQixFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxFQUFFO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxTQUFTO2FBQ1o7U0FDSjtRQUVELFlBQVk7UUFDWixJQUFJLElBQUEsa0JBQWEsRUFBQyxNQUFNLENBQUMsRUFBRTtZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEscUJBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QyxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxtQkFBYyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEMsU0FBUztTQUNaO1FBRUQsT0FBTztRQUNQLElBQUksSUFBQSxhQUFRLEVBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxJQUFBLGtCQUFhLEVBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3pCLHNDQUFzQztvQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFnQixFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxtQkFBYyxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO2FBQ0o7WUFDRCxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUVELHdCQUF3QjtJQUN4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDZixJQUFJLEdBQUcsZ0JBQVE7YUFDVixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF0RUQsaUNBc0VDIn0=