import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __fs from "fs";
import __unzipper from "unzipper";
import __folderPath from "../fs/folderPath";
import __fileName from "../fs/filename";
import __SDuration from "@coffeekraken/s-duration";
function unzip(zipFilePath, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({}, settings != null ? settings : {});
    if (!__fs.existsSync(zipFilePath)) {
      throw new Error(`The passed file "${zipFilePath}" does not exists...`);
    }
    const duration = new __SDuration();
    const folderName = __fileName(zipFilePath).replace(/\.g?zip$/, "");
    let dest = settings.dest ? `${settings.dest}/${folderName}` : `${__folderPath(zipFilePath)}/${folderName}`;
    __fs.createReadStream(zipFilePath).pipe(__unzipper.Extract({ path: dest })).on("close", () => {
      if (!__fs.existsSync(dest)) {
        throw new Error(`Something went wrong during the unzip process of the file "${zipFilePath}"...`);
      }
      resolve(__spreadValues({
        dest
      }, duration.end()));
    });
  });
}
export {
  unzip as default
};
