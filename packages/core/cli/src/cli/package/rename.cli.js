import __SCliPackageRenameParamsInterface from "../../node/package/interface/SCliPackageRenameParamsInterface";
import __SPromise from "@coffeekraken/s-promise";
import __renamePackage from "@coffeekraken/sugar/node/package/renamePackage";
import __fs from "fs";
var rename_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = __SCliPackageRenameParamsInterface.apply(stringArgs);
    if (!finalParams.name) {
      finalParams.name = await emit("ask", {
        type: "input",
        message: "Please enter the new name for your package",
        pattern: "^[a-zA-Z0-9_@/-]+$"
      });
    }
    if (finalParams.folder === void 0) {
      finalParams.folder = await emit("ask", {
        type: "confirm",
        message: "Do you want to rename the folder as well ?",
        default: true
      });
    }
    emit("log", {
      value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`
    });
    __renamePackage(finalParams.name);
    if (finalParams.folder) {
      const folderName = finalParams.name.split("/").pop();
      emit("log", {
        value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`
      });
      const newPath = `${process.cwd().split("/").slice(0, -1).join("/")}/${folderName}`;
      __fs.renameSync(process.cwd(), newPath);
      process.chdir(newPath);
      emit("chdir", newPath);
    }
    resolve();
  });
};
export {
  rename_cli_default as default
};
