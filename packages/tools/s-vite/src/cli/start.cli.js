import __SPromise from "@coffeekraken/s-promise";
import __SVite from "../node/SVite";
function start(stringArgs = "") {
  return new __SPromise(async ({ resolve, pipe }) => {
    const vite = new __SVite();
    const promise = vite.start(stringArgs);
    pipe(promise);
    resolve(await promise);
  });
}
export {
  start as default
};
