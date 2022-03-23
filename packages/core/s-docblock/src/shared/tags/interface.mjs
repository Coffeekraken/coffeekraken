import {
  __toESM
} from "../../../../../chunk-JETN4ZEY.mjs";
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
import __path from "path";
import __checkPathWithMultipleExtensions from "@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions";
import __fileName from "@coffeekraken/sugar/node/fs/filename";
import __deepMap from "@coffeekraken/sugar/shared/object/deepMap";
async function interfaceTag(data, blockSettings) {
  let stringArray = [];
  if (data.value === true) {
    stringArray = [__fileName(blockSettings.filepath), "default"];
    if (blockSettings.filepath.match(/\.ts$/)) {
      return;
    }
  } else {
    stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  }
  let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : "default";
  const potentialPath = __checkPathWithMultipleExtensions(__path.resolve(__folderPath(blockSettings.filepath), path), ["js"]);
  if (!potentialPath)
    return;
  const int = await Promise.resolve().then(() => __toESM(require(potentialPath)));
  const interfaceObj = int[importName].toObject();
  interfaceObj.definition = __deepMap(interfaceObj.definition, ({ object, prop, value }) => {
    if (typeof value === "string") {
      const newValue = new String(value);
      newValue.render = true;
      return newValue;
    }
    return value;
  });
  return interfaceObj;
}
export {
  interfaceTag as default
};
