import __SLog from "@coffeekraken/s-log";
import __SPromise from "@coffeekraken/s-promise";
import __SCliAddSugarJsonParamsInterface from "../../node/add/interface/SCliAddSugarJsonParamsInterface";
import __writeJsonSync from "@coffeekraken/sugar/node/fs/writeJsonSync";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import __fs from "fs";
var sugarJson_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = __SCliAddSugarJsonParamsInterface.apply(stringArgs);
    emit("log", {
      type: __SLog.TYPE_INFO,
      value: `<yellow>[sugarJson]</yellow> Adding the sugar.json file with the recipe <cyan>${finalParams.recipe}</cyan>`
    });
    if (__fs.existsSync(`${process.cwd()}/sugar.json`)) {
      const json = __readJsonSync(`${process.cwd()}/sugar.json`);
      json.recipe = finalParams.recipe;
      __writeJsonSync(`${process.cwd()}/sugar.json`, json);
    } else {
      __writeJsonSync(`${process.cwd()}/sugar.json`, {
        recipe: finalParams.recipe
      });
    }
    resolve();
  });
};
export {
  sugarJson_cli_default as default
};
