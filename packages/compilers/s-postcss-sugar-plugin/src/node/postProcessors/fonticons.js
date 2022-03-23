var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var fonticons_exports = {};
__export(fonticons_exports, {
  default: () => fonticons_default
});
module.exports = __toCommonJS(fonticons_exports);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_extension = __toESM(require("@coffeekraken/sugar/node/fs/extension"));
var import_ensureDirSync = __toESM(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
var import_folderHash = __toESM(require("@coffeekraken/sugar/node/fs/folderHash"));
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"));
var import_packageCacheDir = __toESM(require("@coffeekraken/sugar/node/path/packageCacheDir"));
var import_srcCssDir = __toESM(require("@coffeekraken/sugar/node/path/srcCssDir"));
var import_fantasticon = require("fantasticon");
var import_oslllo_svg_fixer = __toESM(require("oslllo-svg-fixer"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_postcss = __toESM(require("postcss"));
async function fonticons_default({ root, sharedData }) {
  const duration = new import_s_duration.default();
  if (!sharedData.icons || !sharedData.icons.length)
    return;
  const fantasticonConfig = import_s_sugar_config.default.get("icons.fantasticon");
  const importFontUrl = import_path.default.relative((0, import_srcCssDir.default)(), fantasticonConfig.outputDir);
  root.nodes.unshift(import_postcss.default.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `));
  const inputDir = `${(0, import_packageCacheDir.default)()}/icons/sugarIcons`;
  try {
    import_fs.default.rmSync(inputDir, { recursive: true });
  } catch (e) {
  }
  (0, import_ensureDirSync.default)(inputDir);
  (0, import_ensureDirSync.default)(fantasticonConfig.outputDir);
  sharedData.icons.forEach((iconObj) => {
    import_fs.default.copyFileSync(iconObj.path, `${inputDir}/${iconObj.as}.${(0, import_extension.default)(iconObj.path)}`);
  });
  const folderHash = (0, import_folderHash.default)(inputDir);
  const hashCacheFilePath = `${(0, import_packageCacheDir.default)()}/postcss/iconsFolderHash.txt`;
  if (import_fs.default.existsSync(hashCacheFilePath)) {
    const cachedFolderHash = import_fs.default.readFileSync(hashCacheFilePath, "utf8").toString();
    if (cachedFolderHash === folderHash) {
      console.log(`<green>[fonticons]</green> All icon(s) are up to date`);
      return;
    }
  }
  console.log(`<yellow>[fonticons]</yellow> Generate icons font...`);
  const fixResult = await (0, import_oslllo_svg_fixer.default)(inputDir, inputDir).fix();
  const result = await (0, import_fantasticon.generateFonts)({
    inputDir,
    outputDir: fantasticonConfig.outputDir,
    name: fantasticonConfig.name,
    normalize: true,
    selector: ".s-icon",
    prefix: "--"
  });
  const iconsFilenames = import_fs.default.readdirSync(inputDir);
  if (!iconsFilenames.length)
    return;
  const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
  iconsFilenames.forEach((filename) => {
    iconsSelectorsArrayBefore.push(`.s-icon--${filename.replace(/\.svg$/, "")}:before`);
    iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, "")}`);
  });
  const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
  let cssStr = import_fs.default.readFileSync(cssPath, "utf8").toString();
  cssStr = cssStr.replace(/\.s-icon\.--/gm, ".s-icon-");
  cssStr = cssStr.replace(/\.s-icon:before\s?{/, `${iconsSelectorsArrayBefore.join(",")} {
position: relative;
`);
  cssStr += [
    `${iconsSelectorsArray.join(",")} {`,
    "display: inline-block;",
    "line-height: 1;",
    "width: 1em;",
    "height:1em;",
    "vertical-align: middle;",
    "}"
  ].join("\n");
  import_fs.default.writeFileSync(cssPath, cssStr);
  (0, import_writeFileSync.default)(hashCacheFilePath, folderHash);
  console.log(`<green>[fonticons]</green> Sugar fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
