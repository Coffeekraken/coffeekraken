"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const unzipper_1 = __importDefault(require("unzipper"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const filename_1 = __importDefault(require("../fs/filename"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
function unzip(zipFilePath, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
        if (!fs_1.default.existsSync(zipFilePath)) {
            throw new Error(`The passed file "${zipFilePath}" does not exists...`);
        }
        const duration = new s_duration_1.default();
        const folderName = (0, filename_1.default)(zipFilePath).replace(/\.g?zip$/, '');
        let dest = settings.dest
            ? `${settings.dest}/${folderName}`
            : `${(0, folderPath_1.default)(zipFilePath)}/${folderName}`;
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
exports.default = unzip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLHdEQUFrQztBQUNsQyxrRUFBNEM7QUFDNUMsOERBQXdDO0FBRXhDLDBFQUFtRDtBQW1DbkQsU0FBd0IsS0FBSyxDQUN6QixXQUFtQixFQUNuQixRQUFrQztJQUVsQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEscUJBQ0QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0JBQW9CLFdBQVcsc0JBQXNCLENBQ3hELENBQUM7U0FDTDtRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBRW5DLE1BQU0sVUFBVSxHQUFHLElBQUEsa0JBQVUsRUFBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJO1lBQ3BCLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFFO1lBQ2xDLENBQUMsQ0FBQyxHQUFHLElBQUEsb0JBQVksRUFBQyxXQUFXLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUVuRCxZQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO2FBQzdCLElBQUksQ0FBQyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsOERBQThELFdBQVcsTUFBTSxDQUNsRixDQUFDO2FBQ0w7WUFDRCxPQUFPLGlCQUNILElBQUksSUFDRCxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQ25CLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXBDRCx3QkFvQ0MifQ==