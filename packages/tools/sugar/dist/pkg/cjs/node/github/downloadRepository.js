"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const systemTmpDir_1 = __importDefault(require("../path/systemTmpDir"));
const unzip_1 = __importDefault(require("../zip/unzip"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const filename_1 = __importDefault(require("../fs/filename"));
const folderPath_1 = __importDefault(require("../fs/folderPath"));
function downloadRepository(repository, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ dest: '', unzip: false, branch: 'master' }, (settings !== null && settings !== void 0 ? settings : {}));
        if (!settings.dest) {
            settings.dest = `${(0, systemTmpDir_1.default)()}/downloads/${repository
                .replace(/[\/\s]/gm, '-')
                .toLowerCase()}-${settings.branch}.zip`;
        }
        let dest = settings.dest;
        if (!dest.match(/\.g?zip$/)) {
            dest = `${dest}/${repository
                .replace(/[\/\s]/gm, '-')
                .toLowerCase()}-${settings.branch}.zip`;
        }
        const folderName = (0, filename_1.default)(dest).replace(/\.g?zip$/, '');
        fs_extra_1.default.ensureDir((0, folderPath_1.default)(dest));
        const url = `https://codeload.github.com/${repository}/zip/${settings.branch}`;
        const file = fs_1.default.createWriteStream(dest);
        const request = https_1.default
            .get(url, function (response) {
            response.pipe(file);
            file.on('finish', () => __awaiter(this, void 0, void 0, function* () {
                yield file.close(); // close() is async, call cb after close completes.
                if (settings === null || settings === void 0 ? void 0 : settings.unzip) {
                    const newDest = dest.split('/').slice(0, -1).join('/');
                    const destFolderPath = dest.replace(/\.g?zip$/, '');
                    fs_extra_1.default.removeSync(destFolderPath);
                    yield (0, unzip_1.default)(dest, {
                        dest: newDest,
                    });
                    const files = fs_1.default.readdirSync(destFolderPath);
                    fs_extra_1.default.moveSync(`${destFolderPath}/${files[0]}`, `${newDest}/${files[0]}`, { overwrite: true });
                    fs_extra_1.default.removeSync(destFolderPath);
                    fs_extra_1.default.moveSync(`${newDest}/${files[0]}`, `${newDest}/${folderName}`);
                    fs_extra_1.default.removeSync(dest);
                    dest = `${newDest}/${folderName}`;
                }
                resolve({
                    dest,
                });
            }));
        })
            .on('error', (err) => __awaiter(this, void 0, void 0, function* () {
            // Handle errors
            try {
                fs_1.default.unlinkSync(settings === null || settings === void 0 ? void 0 : settings.dest); // Delete the file async. (But we don't check the result)
            }
            catch (e) { }
            reject({
                error: err,
            });
        }));
    });
}
exports.default = downloadRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLGtEQUE0QjtBQUM1Qix3RUFBNEM7QUFDNUMseURBQW1DO0FBQ25DLHdEQUFpQztBQUNqQyw4REFBd0M7QUFDeEMsa0VBQTRDO0FBbUM1QyxTQUF3QixrQkFBa0IsQ0FDdEMsVUFBa0IsRUFDbEIsUUFBcUQ7SUFFckQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxRQUFRLG1CQUNKLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLEtBQUssRUFDWixNQUFNLEVBQUUsUUFBUSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNoQixRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBQSxzQkFBUSxHQUFFLGNBQWMsVUFBVTtpQkFDaEQsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7aUJBQ3hCLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLE1BQU0sQ0FBQztTQUMvQztRQUVELElBQUksSUFBSSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLFVBQVU7aUJBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO2lCQUN4QixXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsTUFBTSxNQUFNLENBQUM7U0FDL0M7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFB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