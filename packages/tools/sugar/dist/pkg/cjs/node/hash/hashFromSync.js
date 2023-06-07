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
    if (!Array.isArray(sources)) {
        sources = [sources];
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQTBFO0FBQzFFLCtDQUFpRTtBQUNqRSxpREFBNEQ7QUFDNUQsdURBQTBEO0FBQzFELG9EQUF3RDtBQUN4RCw0Q0FBc0I7QUE0Q3RCLFNBQXdCLGNBQWMsQ0FDbEMsT0FBeUIsRUFDekIsUUFBcUM7SUFFckMsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsTUFBTSxhQUFhLG1CQUNmLElBQUksRUFBRSxRQUFRLEVBQ2QsTUFBTSxFQUFFLFFBQVEsSUFDYixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxJQUFJLENBQUM7SUFFVCxLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUN4QixlQUFlO1FBQ2YsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTO1NBQ1o7UUFFRCxVQUFVO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzlELE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQWlCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFnQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFNBQVM7YUFDWjtTQUNKO1FBRUQsWUFBWTtRQUNaLElBQUksSUFBQSxrQkFBYSxFQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBZ0IsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFNBQVM7U0FDWjtRQUVELGdCQUFnQjtRQUNoQixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLG1CQUFjLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxTQUFTO1NBQ1o7UUFFRCxPQUFPO1FBQ1AsSUFBSSxJQUFBLGFBQVEsRUFBQyxNQUFNLENBQUMsRUFBRTtZQUNsQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO2dCQUN4QixJQUFJLElBQUEsa0JBQWEsRUFBQyxRQUFRLENBQUMsRUFBRTtvQkFDekIsc0NBQXNDO29CQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEscUJBQWdCLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLG1CQUFjLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDekM7YUFDSjtZQUNELFNBQVM7U0FDWjtRQUVELGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNmLElBQUksR0FBRyxnQkFBUTthQUNWLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFFRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFFRCxpQ0EwRUMifQ==