import __SGlob from "@coffeekraken/s-glob";
import __spawn from "../node/process/spawn";
import __SPromise from "@coffeekraken/s-promise";
import __path from "path";
import __SDuration from "@coffeekraken/s-duration";
import __formatDuration from "@coffeekraken/sugar/shared/time/formatDuration";
import __SRunCommandParamsInterface from "./interface/SRunCommandParamsInterface";
function runCommand(stringArgs = "") {
  return new __SPromise(async ({ resolve, reject, emit, pipe, pipeErrors }) => {
    const props = __SRunCommandParamsInterface.apply(stringArgs);
    let paths = [];
    const duration = new __SDuration();
    let currentDuration = 0;
    if (props.directory) {
      paths = __SGlob.resolve(props.directory, {
        cwd: process.cwd(),
        nodir: false,
        SFile: false
      });
    } else {
      paths = [process.cwd()];
    }
    emit("log", {
      value: `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these <cyan>${paths.length}</cyan> folder(s):${paths.map((p) => {
        return `
- <cyan>${__path.relative(process.cwd(), p)}</cyan>`;
      })}`
    });
    emit("log", {
      value: " "
    });
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      emit("log", {
        value: `<yellow>[command]</yellow> Executing command "<yellow>${props.command}</yellow>" in folder:`
      });
      emit("log", {
        value: `<yellow>[command]</yellow> <cyan>${__path.relative(process.cwd(), path)}</cyan>`
      });
      const start = Date.now();
      const command = __spawn(props.command, [], {
        cwd: path
      });
      if (props.verbose)
        pipe(command);
      else
        pipeErrors(command);
      const result = await command;
      const end = Date.now();
      currentDuration += end - start;
      const average = currentDuration / i;
      const remaining = average * (paths.length - i);
      emit("log", {
        value: `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`
      });
      emit("log", {
        value: `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${__formatDuration(remaining)}</cyan> remaining...`
      });
      emit("log", {
        value: " "
      });
    }
    emit("log", {
      value: `<green>[success]</green> Command "<yellow>${props.command}</yellow>" executed <green>successfully</green> in <cyan>${paths.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`
    });
    resolve();
  });
}
export {
  runCommand as default
};
