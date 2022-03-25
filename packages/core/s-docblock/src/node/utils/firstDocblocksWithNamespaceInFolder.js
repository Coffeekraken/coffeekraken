var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __findInFiles from "find-in-files";
import __minimatch from "minimatch";
import __fs from "fs";
import __path from "path";
import __getFilename from "@coffeekraken/sugar/node/fs/filename";
import __extension from "@coffeekraken/sugar/node/fs/extension";
import __SDocblock from "../../shared/SDocblock";
async function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
  settings = __deepMerge({
    exclude: "**/+(__tests__|__wip__)/**"
  }, settings);
  if (!__fs.existsSync(directory))
    return {};
  const founded = await __findInFiles.find(`@namespace`, directory);
  const namespaceObj = {};
  for (let i = 0; i < Object.keys(founded).length; i++) {
    const path = founded[Object.keys(founded)[i]];
    const relativePath = __path.relative(directory, path);
    if (__minimatch(relativePath, settings.exclude))
      return;
    const content = __fs.readFileSync(path, "utf8");
    const docblocks = new __SDocblock(content);
    await docblocks.parse();
    const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
    if (!docblock)
      return;
    delete docblock.object.raw;
    const name = docblock.object.name || __getFilename(path).replace(`.${__extension(path)}`, "");
    namespaceObj[docblock.object.namespace + "." + name] = __spreadProps(__spreadValues({}, docblock.object), {
      path: relativePath
    });
  }
  return namespaceObj;
}
export {
  firstDocblockWithNamespaceInFolder as default
};
