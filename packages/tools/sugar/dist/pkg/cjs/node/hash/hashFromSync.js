"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isGlob_js_1 = __importDefault(require("../../shared/is/isGlob.js"));
const objectHash_js_1 = __importDefault(require("../../shared/object/objectHash.js"));
const fileHashSync_js_1 = __importDefault(require("../fs/fileHashSync.js"));
const folderHashSync_js_1 = __importDefault(require("../fs/folderHashSync.js"));
const isDirectory_js_1 = __importDefault(require("../is/isDirectory.js"));
const packagePathSync_js_1 = __importDefault(require("../npm/packagePathSync.js"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
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
            hashes.push((0, objectHash_js_1.default)(source));
            continue;
        }
        // package
        if (!source.startsWith('/') && source.match(/^[a-zA-Z-_\/\@]+$/)) {
            const path = (0, packagePathSync_js_1.default)(source);
            if (path) {
                hashes.push((0, folderHashSync_js_1.default)(path));
                continue;
            }
        }
        // directory
        if ((0, isDirectory_js_1.default)(source)) {
            hashes.push((0, folderHashSync_js_1.default)(source));
            continue;
        }
        // absolute file
        if (fs_1.default.existsSync(source)) {
            hashes.push((0, fileHashSync_js_1.default)(source));
            continue;
        }
        // glob
        if ((0, isGlob_js_1.default)(source)) {
            const files = __glob.sync(source);
            for (let filePath of files) {
                if ((0, isDirectory_js_1.default)(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push((0, folderHashSync_js_1.default)(filePath));
                }
                else {
                    hashes.push((0, fileHashSync_js_1.default)(filePath));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQWlEO0FBQ2pELHNGQUE2RDtBQUM3RCw0RUFBbUQ7QUFDbkQsZ0ZBQXVEO0FBQ3ZELDBFQUFpRDtBQUNqRCxtRkFBMEQ7QUFFMUQsb0RBQXdEO0FBQ3hELDRDQUFzQjtBQTRDdEIsU0FBd0IsY0FBYyxDQUNsQyxPQUF5QixFQUN6QixRQUFxQztJQUVyQyxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdkI7SUFFRCxNQUFNLGFBQWEsbUJBQ2YsSUFBSSxFQUFFLFFBQVEsRUFDZCxNQUFNLEVBQUUsUUFBUSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLElBQUksQ0FBQztJQUVULEtBQUssSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1FBQ3hCLGVBQWU7UUFDZixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsdUJBQVksRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLFNBQVM7U0FDWjtRQUVELFVBQVU7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDOUQsTUFBTSxJQUFJLEdBQUcsSUFBQSw0QkFBaUIsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLElBQUksRUFBRTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsMkJBQWdCLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsU0FBUzthQUNaO1NBQ0o7UUFFRCxZQUFZO1FBQ1osSUFBSSxJQUFBLHdCQUFhLEVBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLDJCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEMsU0FBUztTQUNaO1FBRUQsZ0JBQWdCO1FBQ2hCLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEseUJBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLFNBQVM7U0FDWjtRQUVELE9BQU87UUFDUCxJQUFJLElBQUEsbUJBQVEsRUFBQyxNQUFNLENBQUMsRUFBRTtZQUNsQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO2dCQUN4QixJQUFJLElBQUEsd0JBQWEsRUFBQyxRQUFRLENBQUMsRUFBRTtvQkFDekIsc0NBQXNDO29CQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsMkJBQWdCLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLHlCQUFjLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDekM7YUFDSjtZQUNELFNBQVM7U0FDWjtRQUVELGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNmLElBQUksR0FBRyxnQkFBUTthQUNWLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDckM7SUFFRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFFRCxpQ0EwRUMifQ==