import __SPromise from "@coffeekraken/s-promise";
import __fkill from "fkill";
function kill(params) {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    if (params.id) {
      await __fkill(params.id);
      emit("log", {
        value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`
      });
    } else if (params.port) {
      try {
        await __fkill(`:${params.port}`);
        emit("log", {
          value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`
        });
      } catch (e) {
        emit("log", {
          value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`
        });
      }
    }
    resolve();
  });
}
export {
  kill as default
};
