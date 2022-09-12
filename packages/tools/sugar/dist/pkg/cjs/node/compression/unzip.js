"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const unzipper_1 = __importDefault(require("unzipper"));
const fs_2 = require("@coffeekraken/sugar/fs");
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
function __unzip(zipFilePath, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
        if (!fs_1.default.existsSync(zipFilePath)) {
            throw new Error(`The passed file "${zipFilePath}" does not exists...`);
        }
        const duration = new s_duration_1.default();
        const folderName = (0, fs_2.__fileName)(zipFilePath).replace(/\.g?zip$/, '');
        let dest = settings.dest
            ? `${settings.dest}/${folderName}`
            : `${(0, fs_2.__folderPath)(zipFilePath)}/${folderName}`;
        fs_1.default.createReadStream(zipFilePath)
            .pipe(unzipper_1.default.Extract({ path: dest }))
            .on('close', () => {
            if (!fs_1.default.existsSync(dest)) {
                throw new Error(`Something went wrong during the unzip process of the file "${zipFilePath}"...`);
            }
            resolve(Object.assign({ dest }, duration.end()));
        });
    });
}
exports.default = __unzip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLHdEQUFrQztBQUNsQywrQ0FBa0U7QUFFbEUsMEVBQW1EO0FBbUNuRCxTQUF3QixPQUFPLENBQzNCLFdBQW1CLEVBQ25CLFFBQWtDO0lBRWxDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxxQkFDRCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQkFBb0IsV0FBVyxzQkFBc0IsQ0FDeEQsQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFFbkMsTUFBTSxVQUFVLEdBQUcsSUFBQSxlQUFVLEVBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSTtZQUNwQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUNsQyxDQUFDLENBQUMsR0FBRyxJQUFBLGlCQUFZLEVBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUM7UUFFbkQsWUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzthQUM3QixJQUFJLENBQUMsa0JBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN4QyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixNQUFNLElBQUksS0FBSyxDQUNYLDhEQUE4RCxXQUFXLE1BQU0sQ0FDbEYsQ0FBQzthQUNMO1lBQ0QsT0FBTyxpQkFDSCxJQUFJLElBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUNuQixDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFwQ0QsMEJBb0NDIn0=