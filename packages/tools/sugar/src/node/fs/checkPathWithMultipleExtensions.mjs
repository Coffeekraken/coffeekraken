import "../../../../../chunk-TD77TI6B.mjs";
import __extension from "./extension";
import __fs from "fs";
function checkPathWithMultipleExtensions(path, exts) {
  const extension = __extension(path) || "";
  const pathWithoutExt = path.replace(`.${extension}`, "");
  for (let i = 0; i < exts.length; i++) {
    const ext = exts[i];
    if (__fs.existsSync(`${pathWithoutExt}.${ext}`)) {
      return `${pathWithoutExt}.${ext}`;
    }
  }
  return void 0;
}
export {
  checkPathWithMultipleExtensions as default
};
