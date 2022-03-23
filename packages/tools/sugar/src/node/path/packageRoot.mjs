import "../../../../../chunk-TD77TI6B.mjs";
import __isFile from "../is/file";
import __findPkgJson from "find-package-json";
function packageRoot(from = process.cwd(), highest = false) {
  if (__isFile(from))
    from = from.split("/").slice(0, -1).join("/");
  const f = __findPkgJson(from);
  let file = f.next();
  if (!file || !file.filename)
    return false;
  if (!highest) {
    const filename = file.filename || false;
    if (!filename)
      return filename;
    return filename.split("/").slice(0, -1).join("/");
  }
  let finalFile;
  while (!file.done) {
    if (file.done)
      break;
    finalFile = file;
    file = f.next();
  }
  if (finalFile.filename) {
    return finalFile.filename.split("/").slice(0, -1).join("/");
  }
  return false;
}
var packageRoot_default = packageRoot;
export {
  packageRoot_default as default
};
