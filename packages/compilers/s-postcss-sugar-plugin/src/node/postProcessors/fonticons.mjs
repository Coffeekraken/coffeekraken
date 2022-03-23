import "../../../../../chunk-TD77TI6B.mjs";
import __SDuration from "@coffeekraken/s-duration";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __extension from "@coffeekraken/sugar/node/fs/extension";
import __ensureDirSync from "@coffeekraken/sugar/node/fs/ensureDirSync";
import __folderHash from "@coffeekraken/sugar/node/fs/folderHash";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __packageCacheDir from "@coffeekraken/sugar/node/path/packageCacheDir";
import __srcCssDir from "@coffeekraken/sugar/node/path/srcCssDir";
import { generateFonts } from "fantasticon";
import __svgFixer from "oslllo-svg-fixer";
import __fs from "fs";
import __path from "path";
import __postcss from "postcss";
async function fonticons_default({ root, sharedData }) {
  const duration = new __SDuration();
  if (!sharedData.icons || !sharedData.icons.length)
    return;
  const fantasticonConfig = __SSugarConfig.get("icons.fantasticon");
  const importFontUrl = __path.relative(__srcCssDir(), fantasticonConfig.outputDir);
  root.nodes.unshift(__postcss.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `));
  const inputDir = `${__packageCacheDir()}/icons/sugarIcons`;
  try {
    __fs.rmSync(inputDir, { recursive: true });
  } catch (e) {
  }
  __ensureDirSync(inputDir);
  __ensureDirSync(fantasticonConfig.outputDir);
  sharedData.icons.forEach((iconObj) => {
    __fs.copyFileSync(iconObj.path, `${inputDir}/${iconObj.as}.${__extension(iconObj.path)}`);
  });
  const folderHash = __folderHash(inputDir);
  const hashCacheFilePath = `${__packageCacheDir()}/postcss/iconsFolderHash.txt`;
  if (__fs.existsSync(hashCacheFilePath)) {
    const cachedFolderHash = __fs.readFileSync(hashCacheFilePath, "utf8").toString();
    if (cachedFolderHash === folderHash) {
      console.log(`<green>[fonticons]</green> All icon(s) are up to date`);
      return;
    }
  }
  console.log(`<yellow>[fonticons]</yellow> Generate icons font...`);
  const fixResult = await __svgFixer(inputDir, inputDir).fix();
  const result = await generateFonts({
    inputDir,
    outputDir: fantasticonConfig.outputDir,
    name: fantasticonConfig.name,
    normalize: true,
    selector: ".s-icon",
    prefix: "--"
  });
  const iconsFilenames = __fs.readdirSync(inputDir);
  if (!iconsFilenames.length)
    return;
  const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
  iconsFilenames.forEach((filename) => {
    iconsSelectorsArrayBefore.push(`.s-icon--${filename.replace(/\.svg$/, "")}:before`);
    iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, "")}`);
  });
  const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
  let cssStr = __fs.readFileSync(cssPath, "utf8").toString();
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
  __fs.writeFileSync(cssPath, cssStr);
  __writeFileSync(hashCacheFilePath, folderHash);
  console.log(`<green>[fonticons]</green> Sugar fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
}
export {
  fonticons_default as default
};
