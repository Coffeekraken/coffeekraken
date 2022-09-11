var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fs from 'fs';
import __https from 'https';
import __tmpDir from '../path/systemTmpDir';
import __unzip from '../zip/unzip';
import __fsExtra from 'fs-extra';
import { __fileName, __folderPath } from '@coffeekraken/sugar/fs';
export default function __downloadGithubRepository(repository, settings) {
    return new Promise((resolve, reject) => {
        settings = Object.assign({ dest: '', unzip: false, branch: 'master' }, (settings !== null && settings !== void 0 ? settings : {}));
        if (!settings.dest) {
            settings.dest = `${__tmpDir()}/downloads/${repository
                .replace(/[\/\s]/gm, '-')
                .toLowerCase()}-${settings.branch}.zip`;
        }
        let dest = settings.dest;
        if (!dest.match(/\.g?zip$/)) {
            dest = `${dest}/${repository
                .replace(/[\/\s]/gm, '-')
                .toLowerCase()}-${settings.branch}.zip`;
        }
        const folderName = __fileName(dest).replace(/\.g?zip$/, '');
        __fsExtra.ensureDir(__folderPath(dest));
        const url = `https://codeload.github.com/${repository}/zip/${settings.branch}`;
        const file = __fs.createWriteStream(dest);
        const request = __https
            .get(url, function (response) {
            response.pipe(file);
            file.on('finish', () => __awaiter(this, void 0, void 0, function* () {
                yield file.close(); // close() is async, call cb after close completes.
                if (settings === null || settings === void 0 ? void 0 : settings.unzip) {
                    const newDest = dest.split('/').slice(0, -1).join('/');
                    const destFolderPath = dest.replace(/\.g?zip$/, '');
                    __fsExtra.removeSync(destFolderPath);
                    yield __unzip(dest, {
                        dest: newDest,
                    });
                    const files = __fs.readdirSync(destFolderPath);
                    __fsExtra.moveSync(`${destFolderPath}/${files[0]}`, `${newDest}/${files[0]}`, { overwrite: true });
                    __fsExtra.removeSync(destFolderPath);
                    __fsExtra.moveSync(`${newDest}/${files[0]}`, `${newDest}/${folderName}`);
                    __fsExtra.removeSync(dest);
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
                __fs.unlinkSync(settings === null || settings === void 0 ? void 0 : settings.dest); // Delete the file async. (But we don't check the result)
            }
            catch (e) { }
            reject({
                error: err,
            });
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBQ25DLE9BQU8sU0FBUyxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBbUNsRSxNQUFNLENBQUMsT0FBTyxVQUFVLDBCQUEwQixDQUM5QyxVQUFrQixFQUNsQixRQUFxRDtJQUVyRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsbUJBQ0osSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsS0FBSyxFQUNaLE1BQU0sRUFBRSxRQUFRLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2hCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxRQUFRLEVBQUUsY0FBYyxVQUFVO2lCQUNoRCxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztpQkFDeEIsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sTUFBTSxDQUFDO1NBQy9DO1FBRUQsSUFBSSxJQUFJLEdBQVcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6QixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksVUFBVTtpQkFDdkIsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7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