import "../../../../../../chunk-TD77TI6B.mjs";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
async function frontspec(express, settings, config) {
  config.middlewares.frontspec = {
    path: `${__dirname()}/frontspecMiddleware`,
    settings: {}
  };
  return true;
}
export {
  frontspec as default
};
