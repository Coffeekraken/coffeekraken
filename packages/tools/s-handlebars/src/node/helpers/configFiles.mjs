import "../../../../../chunk-TD77TI6B.mjs";
import __SFile from "@coffeekraken/s-file";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __stripSourcemap from "@coffeekraken/sugar/shared/string/stripSourcemap";
function configFiles(configId, simplify = false) {
  const paths = __SSugarConfig.filesPaths.filter((path) => {
    return path.includes(`/${configId}.config.js`);
  }).map((path) => {
    const obj = __SFile.new(path).toObject();
    if (simplify) {
      obj.content = __stripSourcemap(obj.content);
    }
    return obj;
  });
  return paths;
}
export {
  configFiles as default
};
