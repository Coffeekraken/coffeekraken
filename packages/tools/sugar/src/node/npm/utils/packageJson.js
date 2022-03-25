import __SugarConfig from "@coffeekraken/s-sugar-config";
import __deepMerge from "../../../shared/object/deepMerge";
import __fs from "fs";
function packageJson(name, settings) {
  const set = __deepMerge({
    rootDir: __SugarConfig.get("npm.rootDir")
  });
  if (!__fs.existsSync(`${set.rootDir}/${name}`) || !__fs.existsSync(`${set.rootDir}/${name}/package.json`)) {
    throw new Error(`packageJson: Sorry but the package named "<yellow>${name}</yellow>" from which you try to get the package.json content seems to not exists...`);
  }
  const json = JSON.parse(__fs.readFileSync(`${set.rootDir}/${name}/package.json`, "utf8"));
  return json;
}
export {
  packageJson as default
};
