import __SDocMap from "../node/SDocMap";
import __SPromise from "@coffeekraken/s-promise";
var read_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, pipe }) => {
    const docmap = new __SDocMap();
    const promise = docmap.read(stringArgs);
    pipe(promise);
    console.log(await promise);
    resolve(await promise);
  });
};
export {
  read_cli_default as default
};
