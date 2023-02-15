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
function __hashFrom(sources, settings) {
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
            const path = (0, npm_1.__packagePath)(source);
            if (path) {
                hashes.push((0, fs_1.__folderHash)(path));
                continue;
            }
        }
        // directory
        if ((0, is_1.__isDirectory)(source)) {
            hashes.push((0, fs_1.__folderHash)(source));
            continue;
        }
        // absolute file
        if (fs_2.default.existsSync(source)) {
            hashes.push((0, fs_1.__fileHash)(source));
            continue;
        }
        // glob
        if ((0, is_1.__isGlob)(source)) {
            const files = __glob.sync(source);
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
exports.default = __hashFrom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQWtFO0FBQ2xFLCtDQUFpRTtBQUNqRSxpREFBd0Q7QUFDeEQsdURBQTBEO0FBQzFELG9EQUF3RDtBQUN4RCw0Q0FBc0I7QUEwQ3RCLFNBQXdCLFVBQVUsQ0FDOUIsT0FBeUIsRUFDekIsUUFBcUM7SUFFckMsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLE1BQU0sYUFBYSxtQkFDZixJQUFJLEVBQUUsUUFBUSxFQUNkLE1BQU0sRUFBRSxRQUFRLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDO0lBRVQsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDeEIsZUFBZTtRQUNmLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEMsU0FBUztTQUNaO1FBRUQsVUFBVTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUM5RCxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLGlCQUFZLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsU0FBUzthQUNaO1NBQ0o7UUFFRCxZQUFZO1FBQ1osSUFBSSxJQUFBLGtCQUFhLEVBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLGlCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxlQUFVLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQyxTQUFTO1NBQ1o7UUFFRCxPQUFPO1FBQ1AsSUFBSSxJQUFBLGFBQVEsRUFBQyxNQUFNLENBQUMsRUFBRTtZQUNsQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO2dCQUN4QixJQUFJLElBQUEsa0JBQWEsRUFBQyxRQUFRLENBQUMsRUFBRTtvQkFDekIsc0NBQXNDO29CQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsaUJBQVksRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsZUFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7WUFDRCxTQUFTO1NBQ1o7UUFFRCxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUVELHdCQUF3QjtJQUN4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDZixJQUFJLEdBQUcsZ0JBQVE7YUFDVixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF0RUQsNkJBc0VDIn0=