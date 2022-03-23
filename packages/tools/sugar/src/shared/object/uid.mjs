import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __encryptObject from "../crypt/object";
import __crypto from "crypto";
function uid(obj, settings = {}) {
  settings = __spreadValues({
    format: "sha256",
    key: "sugar.js.object.uid"
  }, settings);
  let uid2 = "";
  uid2 = __encryptObject.encrypt(obj, settings.key);
  switch (settings.format.toLowerCase()) {
    case "full":
      return uid2;
      break;
    case "sha256":
    default:
      const hash = __crypto.createHash("sha256").update(uid2).digest("hex").toString();
      return hash;
      break;
  }
}
var uid_default = uid;
export {
  uid_default as default
};
