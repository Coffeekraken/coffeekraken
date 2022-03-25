import __SPromise from "@coffeekraken/s-promise";
import __SPostcssBuilder from "../node/SPostcssBuilder";
import __SPostcssBuilderBuildParamsInterface from "../node/interface/SPostcssBuilderBuildParamsInterface";
function build(stringArgs = "") {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const builder = new __SPostcssBuilder({
      builder: {
        interface: __SPostcssBuilderBuildParamsInterface
      }
    });
    await pipe(builder.build(stringArgs));
    process.exit();
  });
}
export {
  build as default
};
