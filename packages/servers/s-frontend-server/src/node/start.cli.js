import __SPromise from "@coffeekraken/s-promise";
import __SFrontendServer from "./SFrontendServer";
function start(stringArgs = "") {
  return new __SPromise(async ({ resolve, pipe, emit }) => {
    const server = new __SFrontendServer();
    const promise = server.start(stringArgs);
    pipe(promise);
    resolve(await promise);
  });
}
export {
  start as default
};
