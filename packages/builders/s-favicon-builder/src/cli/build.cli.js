import __SFaviconBuilderBuildParamsInterface from "../node/interface/SFaviconBuilderBuildParamsInterface";
import __SFaviconBuilder from "../node/SFaviconBuilder";
import __SPromise from "@coffeekraken/s-promise";
function build(stringArgs = "") {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    const builder = new __SFaviconBuilder({
      builder: {
        interface: __SFaviconBuilderBuildParamsInterface
      }
    });
    const promise = builder.build(stringArgs);
    pipe(promise);
    resolve(await promise);
    process.exit();
  });
}
export {
  build as default
};
