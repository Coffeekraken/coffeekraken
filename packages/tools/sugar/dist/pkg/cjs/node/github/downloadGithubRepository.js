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
const unzip_1 = __importDefault(require("../compression/unzip"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fs_2 = require("@coffeekraken/sugar/fs");
function __downloadGithubRepository(repository, settings) {
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
        const folderName = (0, fs_2.__fileName)(dest).replace(/\.g?zip$/, '');
        fs_extra_1.default.ensureDir((0, fs_2.__folderPath)(dest));
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
exports.default = __downloadGithubRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLGtEQUE0QjtBQUM1Qix3RUFBNEM7QUFDNUMsaUVBQTJDO0FBQzNDLHdEQUFpQztBQUNqQywrQ0FBa0U7QUFtQ2xFLFNBQXdCLDBCQUEwQixDQUM5QyxVQUFrQixFQUNsQixRQUFxRDtJQUVyRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsS0FBSyxFQUNaLE1BQU0sRUFBRSxRQUFRLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2hCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFBLHNCQUFRLEdBQUUsY0FBYyxVQUFVO2lCQUNoRCxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztpQkFDeEIsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sTUFBTSxDQUFDO1NBQy9DO1FBRUQsSUFBSSxJQUFJLEdBQVcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6QixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksVUFBVTtpQkFDdkIsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7aUJBQ3hCLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLE1BQU0sQ0FBQztTQUMvQztRQUVELE1BQU0sVUFBVSxHQUFHLElBQUEsZUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENB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