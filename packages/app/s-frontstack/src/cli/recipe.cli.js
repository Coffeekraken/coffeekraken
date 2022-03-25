import __SPromise from "@coffeekraken/s-promise";
import __SFrontstack from "../node/SFrontstack";
import __SStdio from "@coffeekraken/s-stdio";
const sugarCliSettings = {
  stdio: __SStdio.UI_TERMINAL
};
function recipe(stringArgs = "") {
  return new __SPromise(async ({ resolve, pipe }) => {
    const frontstack = new __SFrontstack();
    const promise = frontstack.recipe(stringArgs);
    pipe(promise);
    await promise;
    resolve(promise);
  });
}
export {
  recipe as default,
  sugarCliSettings
};
