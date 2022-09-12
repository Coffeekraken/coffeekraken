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
import __unzip from '../compression/unzip';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFtQ2xFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsMEJBQTBCLENBQzlDLFVBQWtCLEVBQ2xCLFFBQXFEO0lBRXJELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsUUFBUSxtQkFDSixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxLQUFLLEVBQ1osTUFBTSxFQUFFLFFBQVEsSUFDYixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDaEIsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLFFBQVEsRUFBRSxjQUFjLFVBQVU7aUJBQ2hELE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO2lCQUN4QixXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsTUFBTSxNQUFNLENBQUM7U0FDL0M7UUFFRCxJQUFJLElBQUksR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxVQUFVO2lCQUN2QixPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FB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