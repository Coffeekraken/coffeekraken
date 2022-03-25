var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __fs from "fs";
import __https from "https";
import __tmpDir from "../path/systemTmpDir";
import __unzip from "../zip/unzip";
import __fsExtra from "fs-extra";
import __fileName from "../fs/filename";
import __folderPath from "../fs/folderPath";
function downloadRepository(repository, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({
      dest: "",
      unzip: false,
      branch: "master"
    }, settings != null ? settings : {});
    if (!settings.dest) {
      settings.dest = `${__tmpDir()}/downloads/${repository.replace(/[\/\s]/gm, "-").toLowerCase()}-${settings.branch}.zip`;
    }
    let dest = settings.dest;
    if (!dest.match(/\.g?zip$/)) {
      dest = `${dest}/${repository.replace(/[\/\s]/gm, "-").toLowerCase()}-${settings.branch}.zip`;
    }
    const folderName = __fileName(dest).replace(/\.g?zip$/, "");
    __fsExtra.ensureDir(__folderPath(dest));
    const url = `https://codeload.github.com/${repository}/zip/${settings.branch}`;
    const file = __fs.createWriteStream(dest);
    const request = __https.get(url, function(response) {
      response.pipe(file);
      file.on("finish", async () => {
        await file.close();
        if (settings == null ? void 0 : settings.unzip) {
          const newDest = dest.split("/").slice(0, -1).join("/");
          const destFolderPath = dest.replace(/\.g?zip$/, "");
          __fsExtra.removeSync(destFolderPath);
          await __unzip(dest, {
            dest: newDest
          });
          const files = __fs.readdirSync(destFolderPath);
          __fsExtra.moveSync(`${destFolderPath}/${files[0]}`, `${newDest}/${files[0]}`, { overwrite: true });
          __fsExtra.removeSync(destFolderPath);
          __fsExtra.moveSync(`${newDest}/${files[0]}`, `${newDest}/${folderName}`);
          __fsExtra.removeSync(dest);
          dest = `${newDest}/${folderName}`;
        }
        resolve({
          dest
        });
      });
    }).on("error", async (err) => {
      try {
        __fs.unlinkSync(settings == null ? void 0 : settings.dest);
      } catch (e) {
      }
      reject({
        error: err
      });
    });
  });
}
export {
  downloadRepository as default
};
