import {
  __spreadValues,
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
import __objectHash from "object-hash";
import __fileHash from "../fs/fileHash";
import __sha256 from "../../shared/crypt/sha256";
import __extension from "../fs/extension";
async function dependenciesHash(dependenciesObj, settings) {
  settings = __spreadValues({
    recursive: true
  }, settings);
  let dataHash = "", filesHashes = [];
  if (dependenciesObj.files) {
    for (let i = 0; i < dependenciesObj.files.length; i++) {
      const filePath = dependenciesObj.files[i];
      let fileDepsHash = "";
      if (settings.recursive) {
        switch (__extension(filePath)) {
          case "js":
            const jsFileExports = await Promise.resolve().then(() => __toESM(require(filePath)));
            if (jsFileExports.dependencies) {
              let deps = jsFileExports.dependencies;
              if (typeof jsFileExports.dependencies === "function") {
                deps = jsFileExports.dependencies();
                fileDepsHash = await dependenciesHash(deps, settings);
              }
            }
            break;
        }
      }
      const fileHash = await __fileHash(filePath);
      filesHashes.push(__sha256.encrypt(`${fileHash}-${fileDepsHash}`));
    }
  }
  if (dependenciesObj.data) {
    dataHash = __objectHash(dependenciesObj.data);
  }
  return __sha256.encrypt(`${dataHash}-${filesHashes.join("-")}`);
}
export {
  dependenciesHash as default
};
