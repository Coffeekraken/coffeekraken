import __SCliFsCopyParamsInterface from "../../node/fs/interface/SCliFsCopyParamsInterface";
import __SPromise from "@coffeekraken/s-promise";
import __copySync from "@coffeekraken/sugar/node/fs/copySync";
import __isDirectory from "@coffeekraken/sugar/node/is/directory";
import __SLog from "@coffeekraken/s-log";
import __SGlob from "@coffeekraken/s-glob";
var copy_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = __SCliFsCopyParamsInterface.apply(stringArgs);
    let files = [finalParams.src];
    if (finalParams.glob) {
      const paths = __SGlob.resolve(finalParams.glob, {
        cwd: finalParams.src,
        nodir: false
      });
      files = paths.map((f) => f.relPath);
    }
    files.forEach((path, i) => {
      const relPath = path;
      if (finalParams.glob)
        path = `${finalParams.src}/${path}`;
      const type = __isDirectory(path) ? "directory" : "file";
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest}</cyan>`
      });
      __copySync(path, finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest);
      if (finalParams.chdir && files.length === i + 1) {
        process.chdir(finalParams.dest);
        emit("chdir", finalParams.dest);
      }
    });
    resolve();
  });
};
export {
  copy_cli_default as default
};
