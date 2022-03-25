import __SPromise from "@coffeekraken/s-promise";
import __SDocMap from "../node/SDocMap";
var build_cli_default = (stringArgs = "") => {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const docmap = new __SDocMap();
    const buildPromise = docmap.build(stringArgs);
    pipe(buildPromise);
    resolve(await buildPromise);
  });
};
export {
  build_cli_default as default
};
