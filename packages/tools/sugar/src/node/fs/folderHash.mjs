import "../../../../../chunk-TD77TI6B.mjs";
import __fs from "fs";
import __sha256 from "../../shared/crypt/sha256";
import __isDirectory from "../is/directory";
import __fileHash from "./fileHash";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
function folderHash(folderPath, settings = {}) {
  settings = __deepMerge({
    recursive: true,
    algo: "sha256",
    digest: "base64",
    include: {
      ctime: false
    }
  }, settings != null ? settings : {});
  const paths = [];
  function readDir(dir) {
    const files = __fs.readdirSync(dir);
    files.forEach((filePath) => {
      if (settings.recursive && __isDirectory(`${dir}/${filePath}`)) {
        return readDir(`${dir}/${filePath}`);
      }
      paths.push(`${dir}/${filePath}`);
    });
  }
  readDir(folderPath);
  const filesHashes = [];
  paths.forEach((path) => {
    if (__isDirectory(path))
      return;
    filesHashes.push(__fileHash(path, settings));
  });
  return __sha256.encrypt(filesHashes.join("-"));
}
export {
  folderHash as default
};
