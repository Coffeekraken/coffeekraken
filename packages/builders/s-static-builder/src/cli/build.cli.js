import __SPromise from "@coffeekraken/s-promise";
import __SStaticBuilder from "../node/SStaticBuilder";
import __SStaticBuilderBuildParamsInterface from "../node/interface/SStaticBuilderBuildParamsInterface";
function build(stringArgs = "") {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const builder = new __SStaticBuilder({
      builder: {
        interface: __SStaticBuilderBuildParamsInterface
      }
    });
    await pipe(builder.build(stringArgs));
    process.exit();
  });
}
export {
  build as default
};
