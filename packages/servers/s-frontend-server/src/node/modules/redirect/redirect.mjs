import "../../../../../../chunk-TD77TI6B.mjs";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
async function redirect(express, settings, config) {
  config.handlers.redirect = {
    path: `${__dirname()}/redirectHandler`
  };
  return true;
}
export {
  redirect as default
};
