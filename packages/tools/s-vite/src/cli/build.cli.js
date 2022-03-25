import __SPromise from "@coffeekraken/s-promise";
import __SVite from "../node/SVite";
function build(stringArgs = "") {
  return new __SPromise(async ({ resolve, pipe }) => {
    const vite = new __SVite();
    const buildPromise = vite.build(stringArgs);
    pipe(buildPromise);
    resolve(await buildPromise);
    process.exit();
  });
}
export {
  build as default
};
