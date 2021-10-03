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
import __fileName from '../fs/filename';
import __folderPath from '../fs/folderPath';
export default function downloadRepository(repository, settings) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRSZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG93bmxvYWRSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBQ25DLE9BQU8sU0FBUyxNQUFNLFVBQVUsQ0FBQztBQUNqQyxPQUFPLFVBQVUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQW1DNUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsVUFBa0IsRUFDbEIsUUFBcUQ7SUFFckQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxRQUFRLG1CQUNKLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLEtBQUssRUFDWixNQUFNLEVBQUUsUUFBUSxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNoQixRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsUUFBUSxFQUFFLGNBQWMsVUFBVTtpQkFDaEQsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7aUJBQ3hCLFdBQVcsRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLE1BQU0sQ0FBQztTQUMvQztRQUVELElBQUksSUFBSSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLFVBQVU7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