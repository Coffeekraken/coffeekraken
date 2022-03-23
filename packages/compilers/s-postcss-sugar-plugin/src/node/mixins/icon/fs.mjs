import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __fs from "fs";
import __path from "path";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __fileName from "@coffeekraken/sugar/node/fs/filename";
class postcssSugarPluginIconFsMixinInterface extends __SInterface {
  static get _definition() {
    return {
      path: {
        type: "String",
        required: true
      },
      as: {
        type: "String",
        required: false
      }
    };
  }
}
function fs_default({
  params,
  atRule,
  replaceWith,
  sourcePath,
  sharedData
}) {
  const finalParams = __spreadValues({
    path: "",
    as: ""
  }, params);
  if (!sharedData.icons) {
    sharedData.icons = [];
  }
  let as = finalParams.as;
  if (!as)
    as = __fileName(finalParams.path.split(".").slice(0, -1).join("."));
  const potentialFilePathFromRoot = __path.resolve(__packageRoot(), finalParams.path);
  const potentialFilePathFromFile = __path.resolve(sourcePath, finalParams.path);
  if (__fs.existsSync(potentialFilePathFromFile)) {
    sharedData.icons.push({
      path: potentialFilePathFromFile,
      as
    });
  } else if (__fs.existsSync(potentialFilePathFromRoot)) {
    sharedData.icons.push({
      path: potentialFilePathFromRoot,
      as
    });
  } else {
    throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
  }
  replaceWith([]);
}
export {
  fs_default as default,
  postcssSugarPluginIconFsMixinInterface as interface
};
