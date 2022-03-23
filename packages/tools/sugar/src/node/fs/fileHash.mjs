import "../../../../../chunk-TD77TI6B.mjs";
import __crypto from "crypto";
import __fs from "fs";
import { Buffer } from "buffer";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
function fileHash(filePath, settings = {}) {
  var _a;
  settings = __deepMerge({
    algo: "sha256",
    digest: "base64",
    include: {
      ctime: false
    }
  }, settings != null ? settings : {});
  let fileBuffer = __fs.readFileSync(filePath);
  if ((_a = settings.include) == null ? void 0 : _a.ctime) {
    try {
      const ctime = __fs.statSync(filePath).ctime;
      const buffer = Buffer.from(ctime);
      fileBuffer = Buffer.concat([fileBuffer, buffer]);
    } catch (e) {
    }
  }
  const hashSum = __crypto.createHash(settings.algo);
  hashSum.update(fileBuffer);
  return hashSum.digest(settings.digest);
}
export {
  fileHash as default
};
